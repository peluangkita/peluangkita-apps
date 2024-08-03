'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import TitleCard from "../ui/TitleCard";
import Link from "next/link";
import axios from "axios";
import { formatterIDR } from "@/lib/utils";
import Button from "../ui/Button";
import toast from "react-hot-toast";

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
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [reqCourses, setReqCourses] = useState([]);

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
    const getRequest = async () => { 
        try {
            const response = await axios.get("/api/courses/request")
            const data = response.data;
            console.log("wl", data)
            setReqCourses(data);
            setLoading(false);
        } catch (err) {
            console.log("[products_GET]", err);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getMyCourses();
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


    if(courses) {
        return (
            <>
            <TitleCard title={"My Course"} topMargin="mt-2" TopSideButtons={<TopSideButtons/>} >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead >
                        <tr className="font-bold text-primary text-[14px]">
                            <th>Title</th>
                            <th>Company</th>
                            <th>Price</th>
                            <th>Available</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {   
                                courses.map(course =>{
                                    return (
                                        <tr key={course.id} className="text-grey ">
                                        <td>{course.title}</td>
                                        <td>{course.mentor.companyName}</td>
                                        <td>{formatterIDR(course.price)}</td>
                                        <td>{course.limitSeat} Orang</td>
                                        {/* <td>{course.requestCourse.accepted ? "Sudah diterima" : "Belum diterima"}</td> */}
                                        <td className="flex flex-col gap-2 items-start">
                                            <Link href={`/course/${course.id}`} className="badge badge-success w-16 text-white font-normal">Detail</Link>
                                        </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>

            <TitleCard title={"Request List"} topMargin="mt-2" >
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead >
                        <tr className="font-bold text-primary text-[14px]">
                            <th>Title</th>
                            <th>Username</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {   
                                reqCourses.map(req =>{
                                    return (
                                        <tr key={req.id} className="text-grey ">
                                        <td>{req.course.title}</td>
                                        <td>{req.user.name}</td>
                                        <td>{formatterIDR(req.course.price)}</td>
                                        <td>{req.accepted ? "Sudah diterima" : "Belum diterima"}</td>
                                        <td className="flex flex-col gap-2 items-start">
                                            <Button handleSubmit={() => handleSubmit(req.id)} text={"Terima"} />
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
    
}
