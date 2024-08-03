"use client"
import {useEffect,useState} from "react"
import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import { formatterIDR } from "@/lib/utils"
import Button from "../ui/Button"
import ReactStars from "react-stars"
import Loading from "@/app/(dashboard)/loading"
export default function CoursesList() {
    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([])

    const getAllCourses = async () => { 
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
        getAllCourses();
    }, []);

    if(courses.length == 0) return <div>Tidak ada kursus yang tersedia</div>
    if (loading) return <Loading />
    return (
        <div className="mx-auto my-4 max-w-[78rem] ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {courses.map((course, idx) => (
                    <Link
                        href={`/course/detail/${course.id}`}
                        key={idx}
                        className="shadow-lg rounded-lg bg-white flex-col my-2"
                    >
                        <div className="p-0 mb-auto">
                            <Image src={course.image} width={300} height={300} alt="" className="rounded-lg" />
                            <div className="p-4">
                                <p className="text-gray-800 font-bold">{course.title}</p>
                                <p className="text-gray-800 text-sm font-reguler">by {course.mentor.companyName}</p>
                                <div className="flex items-center ">
                                    <ReactStars 
                                        count={5}
                                        value={course.rating} 
                                        size={26} 
                                        color2={'#ffd700'}
                                        className="items-start "
                                        edit={false}
                                    />
                                    <span className="pl-2 text-md">{course.rating ? course.rating : 0}</span>
                                </div>
                            </div> 
                        </div>
                          
                        <div className="px-4 flex flex-col gap-2 ">
                            <span className="font-reguler text-sm line-through text-gray-900">{formatterIDR(course.price)}</span>
                            <strong className="font-bold mt-[-4px] text-lg text-gray-900">{formatterIDR(course.discPrice)}</strong>
                        </div>  

                        <div className="p-4">
                            <button className="w-full text-white bg-primary hover:bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <Link href={`/course/detail/${course.id}`}>Ikuti Kelas</Link>
                            </button>
                        </div> 
                    </Link>
                ))}
            </div>
        </div>
    )
    
    
}
