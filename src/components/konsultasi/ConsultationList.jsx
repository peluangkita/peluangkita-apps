'use client'
import { useState, useEffect } from "react";
import TitleCard from "../ui/TitleCard";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/app/(dashboard)/loading";

export default function ConsultationList() {
    const [loading, setLoading] = useState(true);
    const [conversation, setConversation] = useState([]);

    const getList = async () => { 
        try {
            const response = await axios.get("/api/consultation")
            const data = response.data;
            console.log("List:", data)
            setConversation(data);
            setLoading(false);
        } catch (err) {
            console.log("[products_GET]", err);
            setLoading(false);
        }
    };
   
    
    useEffect(() => {
        getList();
    }, []);


    if(loading) return <Loading/>
    return (
        <TitleCard title={"Consultation List"} topMargin="mt-2" >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {   
                            conversation.map((conv,idx) =>{
                                return (
                                    <tr key={idx} className="text-grey ">
                                    <td>{idx+1}</td>
                                    <td>{conv.user.name}</td>
                                    <td>{conv.user.email}</td>
                                    <td>{conv.messages.length > 1  ? "Sudah Dibalas" : "Belum Dibalas"}</td>
                                    <td className="flex flex-col gap-2 items-start">
                                        <Link href={`/consultation/${conv.id}`} className="badge badge-success px-4 text-white">Chat</Link>
                                    </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
        
    );
    
}
