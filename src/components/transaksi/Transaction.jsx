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

export default function Transaction() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [participant, setParticipant] = useState([]);

    const getParticipant = async () => { 
        try {
            const response = await axios.get("/api/courses/transaction")
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

    if(loading) return <Loading /> 
    return (
        <>
        <TitleCard title={"Transaction List"} topMargin="mt-2" >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>No</th>
                        <th>Course Title</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Accepted</th>
                        <th>Payment</th>
                        <th>Paricipated</th>
                        <th>Completed</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {   
                            participant.map((part,idx) =>{
                                return (
                                    <tr key={part.id} className="text-grey justify-center items-center">
                                    <td>{idx+1}</td>
                                    <td>{part.course.title}</td>
                                    <td>{part.user.name}</td>
                                    <td>{part.user.email}</td>
                                    <td>{part.user.phone}</td>
                                    <td>{part.accepted ?  
                                        <Badge color="badge-success" text="Yes" />  : 
                                        <Badge color="badge-error" text="No" />}
                                    </td>
                                    <td>{part.isPaid ?  
                                        <Badge color="badge-success" text="Paid" />  : 
                                        <Badge color="badge-error" text="Not Paid" />}
                                    </td>
                                    <td>{part.participated ?  
                                        <Badge color="badge-success" text="Yes" />  : 
                                        <Badge color="badge-error" text="No" />}
                                    </td>
                                    <td>{part.completed ?  
                                        <Badge color="badge-success" text="Yes" />  : 
                                        <Badge color="badge-error" text="No" />}
                                    </td>
                                    <td>
                                        <Link href={`/transaction/detail/${part.id}`} className="items-center">
                                            <RiEyeFill 
                                                className="text-primary hover:text-secondary cursor-pointer p-1 text-3xl items-center"
                                            />
                                        </Link>
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
