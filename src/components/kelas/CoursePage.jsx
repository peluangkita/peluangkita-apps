'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import TitleCard from "../ui/TitleCard";
import Link from "next/link";
import axios from "axios";
import { formatterIDR } from "@/lib/utils";
import Loading from "@/app/(dashboard)/loading";
import { RiFileEditFill, RiDeleteBin5Fill,RiEyeFill } from "react-icons/ri";

const TopSideButtons = () => {
    const {data:session} =  useSession()
    if (session?.user.role !== 'STUDENT') {
        return(
            <div className="inline-block float-right">
                <Link href="/course/new">
                    <button className="btn px-4 btn-sm normal-case bg-primary hover:bg-tersier text-white" >Add New Course</button>
                </Link>
            </div>
        )
    }
   return
}

export default function CoursePage() {
    const {data:session} =  useSession()
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    const getMyCourses = async () => { 
        try {
            const response = await axios.get("/api/courses")
            const data = await response.data;
            console.log(data)
            setCourses(data);
            setLoading(false);
        } catch (err) {
            console.log("[products_GET]", err);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getMyCourses();
    }, []);


    const handleDelete = async (value) => {
        const approval = confirm("Apakah kamu yakin ingin menghapus?")

        if (approval) {
            await fetch(`/api/courses/detail/${value}`, { method: "DELETE" });
            location.reload()
        }
    }

    if(loading) return <Loading /> 
    return (
        <TitleCard title={"Course List"} topMargin="mt-2" TopSideButtons={<TopSideButtons/>} >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>No</th>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Price</th>
                        <th>Available</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {   
                            courses.map((course, idx) =>{
                                return (
                                    <tr key={course.id} className="text-grey ">
                                    <td>{idx+1}</td>
                                    <td>{course.title}</td>
                                    <td>{course.mentor.companyName}</td>
                                    <td>{formatterIDR(course.price)}</td>
                                    <td>{course.limitSeat} Orang</td>
                                    {/* <td>{course.requestCourse.accepted ? "Sudah diterima" : "Belum diterima"}</td> */}
                                    { session?.user.role !== 'STUDENT' ? 
                                        <td className="flex flex-row gap-1 items-start">
                                            <Link href={`/course/detail/${course.id}`}>
                                                <RiEyeFill 
                                                    className="text-primary hover:text-secondary cursor-pointer p-1 text-3xl"
                                                />
                                            </Link>
                                            <Link href={`/course/edit/${course.id}`}>
                                                <RiFileEditFill 
                                                    className="text-primary hover:text-secondary cursor-pointer p-1 text-3xl"
                                                />
                                            </Link>
                                            <RiDeleteBin5Fill 
                                                onClick={() => handleDelete(course.id)} 
                                                className="text-primary hover:text-secondary cursor-pointer p-1 text-3xl"
                                            />
                                        </td> : ""
                                    }
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
