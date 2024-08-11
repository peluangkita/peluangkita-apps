'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import TitleCard from "../ui/TitleCard";
import axios from "axios";
import { formatterIDR } from "@/lib/utils";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import Loading from "@/app/(dashboard)/loading";
import { useRouter } from "next/navigation";
export default function RequestCourse() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [reqCourses, setReqCourses] = useState([]);

    const getRequest = async () => { 
        try {
            const response = await axios.get("/api/courses/")
            const data = response.data;
            console.log(data)
            setReqCourses(data);
            setLoading(false);
        } catch (err) {
            console.log("[products_GET]", err);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getRequest();
    }, []);

    
    async function handleSubmit(reqId) {
        try {
          const response = await fetch("/api/courses/request/", {
            method: "POST",
            body: JSON.stringify(reqId),
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
        <TitleCard title={"Request Course List"} topMargin="mt-2" >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>Title</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {   
                            reqCourses.map(req =>{
                                return (
                                    <tr key={req.id} className="text-grey ">
                                    <td>{req.course.title}</td>
                                    <td>{session.user.role === "MENTOR" ? req.user.name : req.mentor.companyName}</td>
                                    <td>{session.user.role === "MENTOR" ? req.user.email : req.mentor.email}</td>
                                    <td>{formatterIDR(req.course.price)}</td>
                                    <td>{req.accepted ? "Sudah diterima" : "Menunggu Konfirmasi"}</td>
                                    <td className="flex flex-col gap-2 items-start">
                                        {session.user.role === "MENTOR" ? 
                                        <Button handleSubmit={() => handleSubmit(req.id)} text={"Terima"} /> :''}
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
