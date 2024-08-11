'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import TitleCard from "../ui/TitleCard";
import axios from "axios";
import Link from "next/link";
import { formatterIDR } from "@/lib/utils";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import toast from "react-hot-toast";
import Loading from "@/app/(dashboard)/loading";
import { useRouter } from "next/navigation";
import { RiEyeFill } from "react-icons/ri";

export default function Order() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [participant, setParticipant] = useState([]);

    const getParticipant = async () => { 
        try {
            const response = await axios.get("/api/courses/participant")
            const data = response.data;
            console.log(data)
            setParticipant(data);
            setLoading(false);
        } catch (err) {
            console.log("[products_GET]", err);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getParticipant();
    }, []);

    async function handleSubmit(part) {
        try {
          const response = await fetch("/api/courses/participant/payment/", {
            method: "POST",
            body: JSON.stringify(part),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Berhasil Memilih Kelas");
            router.push('/course')
        } 
        } catch (error) {
          console.error("Network Error:", error);
        }
      }

    if(loading) return <Loading /> 
    return (
        <>
        <TitleCard title={"Waiting Course List"} topMargin="mt-2" >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>Course Title</th>
                        <th>Created By</th>
                        <th>Price</th>
                        <th>Payment</th>
                        <th>Aksi</th>
                    </tr>
                    </thead>
                    <tbody>
                        {   
                            participant.map(part =>{
                                return (
                                    <tr key={part.id} className="text-grey ">
                                    <td>{part.course.title}</td>
                                    <td>{part.course.mentor.companyName}</td>
                                    <td>{formatterIDR(part.course.price)}</td>
                                    <td>{part.isPaid ?  
                                        <Badge color="badge-success" text="Paid" />  : 
                                        <Badge color="badge-error" text="Not Paid" />}
                                    </td>
                                    <td className="flex flex-col gap-2 items-start">
                                        {session.user.role === "MENTOR" ? 
                                        <Button handleSubmit={() => handleSubmit(part.id)} text={"Terima"} /> : 
                                        <Link href={`/order/detail/${part.id}`}>
                                                <RiEyeFill 
                                                    className="text-primary hover:text-secondary cursor-pointer p-1 text-3xl"
                                                />
                                        </Link>}
                                    </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
        </>
    );
}
