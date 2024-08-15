'use client'
import { useState, useEffect } from "react"
import { useParams,useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";
import axios from "axios"
import toast from "react-hot-toast";
import moment from "moment";
import Loading from "@/app/(dashboard)/loading"
import TitleCard from "../ui/TitleCard";
import Text from "../ui/Text";
import ImageUpload from "../ui/ImageUpload";
import { formatterIDR } from "@/lib/utils";
import Button from "../ui/Button";

export default function TransactionDetail() {
    const {data:session} =  useSession()
    const params = useParams()
    const router = useRouter()
    const [pageLoading,setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [participant, setParticipant] = useState([])
    const [accValues, setAccValues] = useState({})

    const getParticipant = async () => { 
        try {
            const res = await axios.get(`/api/courses/participant/detail/${params.partId}`)
            const part = res.data
            console.log(part)
            setParticipant(part);
            setAccValues({
               participantId: part.id,
               paymentId: part.payment[0].id 
            })
            setPageLoading(false);
        } catch (err) {
            console.log("[products_GET]", err);
            setPageLoading(false);
        }
    };
    
    useEffect(() => {
        getParticipant();
    }, []);

    
    async function handleSubmit() {
        setLoading(true)
        try {
          const response = await fetch("/api/courses/transaction/accept", {
            method: "POST",
            body: JSON.stringify(accValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Berhasil Menerima pembayaran");
            setLoading(false)
            router.push('/transaction')
        } 
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false)
        }
      }


    if (pageLoading) return <Loading />
    return (
        <TitleCard title={"Transaction Detail"}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="border p-4 lg:p-6">
                    <h1 className="text-primary font-semibold mb-2">Course Details</h1>
                    <div className="grid grid-cols-6">
                        <Text >Name</Text>
                        <Text custom="text-right pr-2">:</Text>
                        <Text custom='col-span-4' >{participant.course.title}</Text>
                    </div>
                    <div className="grid grid-cols-6">
                        <Text >Category</Text>
                        <Text custom="text-right pr-2">:</Text>
                        <Text custom='col-span-4'>{participant.course.categoryId}</Text>
                    </div>
                    <div className="grid grid-cols-6">
                        <Text >Price</Text>
                        <Text custom="text-right pr-2">:</Text>
                        <Text custom='col-span-4'>{formatterIDR(participant.course.price)}</Text>
                    </div>
                    <div className="grid grid-cols-6">
                        <Text >Seat</Text>
                        <Text custom="text-right pr-2">:</Text>
                        <Text custom='col-span-4'>{participant.course.limitSeat} Participant</Text>
                    </div>
                </div>
                <div className="border p-4 lg:p-6">
                    <h1 className="text-primary font-semibold mb-2">Student Details</h1>
                    <div className="grid grid-cols-6">
                        <Text >Name</Text>
                        <Text custom="text-right pr-2">:</Text>
                        <Text custom='col-span-4' >{participant.user.name}</Text>
                    </div>
                    <div className="grid grid-cols-6">
                        <Text >Email</Text>
                        <Text custom="text-right pr-2">:</Text>
                        <Text custom='col-span-4' >{participant.user.email}</Text>
                    </div>
                    <div className="grid grid-cols-6">
                        <Text >Phone </Text>
                        <Text custom="text-right pr-2">:</Text>
                        <Text custom='col-span-4' >{participant.user.phone}</Text>
                    </div>
                </div>
            </div>
            <div className="border p-6">
                <h1 className="text-primary font-semibold mb-4">Payment Details</h1>
                <ImageUpload url={participant.payment[0].image} button="hidden" sizes="w-[400px] h-[200px]" />
                <Text custom="text-center">Note : {participant.payment[0].status}</Text>
                <Text custom="text-center">Payment Date : {moment(participant.payment[0].createdAt).format("DD MMMM YYYY")}</Text>
            </div>
            {participant.accepted === true ? " " : <Button text={"Accept Payment"} handleSubmit={handleSubmit} loading={loading} />}
        </TitleCard>
    )
}