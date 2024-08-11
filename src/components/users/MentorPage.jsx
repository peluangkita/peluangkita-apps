'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import TitleCard from "../ui/TitleCard";
import Link from "next/link";
import axios from "axios";
import moment from "moment";
import Loading from "@/app/(dashboard)/loading";
import { RiFileEditFill, RiDeleteBin5Fill, RiEyeFill } from "react-icons/ri";

export default function MentorPage() {
    const {data:session} =  useSession()
    const [loading, setLoading] = useState(true);
    const [mentor, setMentor] = useState([]);

    const getMentor = async () => { 
        try {
            const response = await axios.get("/api/users/mentor")
            const data = response.data;
            console.log(data)
            setMentor(data);
            setLoading(false);
        } catch (err) {
            console.log("[products_GET]", err);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getMentor();
    }, []);

    if(loading) return <Loading />
    return (
        <TitleCard title={"Data Mentor"} topMargin="mt-2" >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th></th>
                        <th>Account</th>
                        <th>Valid Until</th>
                        <th>Name</th>
                        <th>Courses</th>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {   
                            mentor.map((user, idx) =>{
                                return (
                                    <tr key={idx} className="text-grey ">
                                    <td>{idx+1}</td>
                                    <td>{user.account.length > 0 ? user.account[0].package.name : "Not Registered"}</td>
                                    <td>{user.account.length > 0 ? moment(user.account[0].expiredAt).format('DD/MM/YYYY') : "Not Registered"}</td>
                                    <td>{user.name}</td>
                                    <td>{user.course.length}</td>
                                    <td>{user.companyName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td className="flex items-center">
                                        <Link href={`/order/detail/${user.id}`}>
                                            <RiEyeFill 
                                                className="text-primary hover:text-secondary cursor-pointer p-1 text-3xl"
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
    );
}
