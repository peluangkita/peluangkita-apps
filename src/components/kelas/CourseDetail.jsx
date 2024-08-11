'use client'
import { useState, useEffect } from "react"
import { useParams,useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";
import ReactStars from 'react-stars'
import Image from 'next/image'
import axios from "axios"
import { formatterIDR } from "@/lib/utils"
import Button from "../ui/Button"
import Loading from "@/app/(dashboard)/loading"
import toast from "react-hot-toast";

export default function CourseDetail() {
    const {data:session} =  useSession()
    const params = useParams()
    const router = useRouter()
    const [pageLoading,setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState([])
    const [reqCourse, setReqCourses] = useState()

    const getCourse = async () => { 
        try {
            const response = await axios.get(`/api/courses/detail/${params.courseId}`)
            const courses = response.data
            console.log(courses)
            setCourse(courses);
            setReqCourses({
                courseId: courses.id,
                mentorId: courses.mentor.id,
            })
            setPageLoading(false);
        } catch (err) {
            console.log("[products_GET]", err);
            setPageLoading(false);
        }
    };
    
    useEffect(() => {
        getCourse();
    }, []);

    async function handleSubmit() {
        try {
          const response = await fetch("/api/courses/request/", {
            method: "POST",
            body: JSON.stringify(reqCourse),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Berhasil Memilih Kelas");
            router.push('/order')
        } 
        } catch (error) {
          console.error("Network Error:", error);
        }
      }

    if (pageLoading) return <Loading />
    return(
        <section>
            <div className="bg-[url('/Banner.png')] lg:h-[200px]">
                <div className="flex flex-col h-full mx-auto p-6 lg:p-10">
                    <div className="justify-center ">
                        <h1 className="font-bold text-white text-2xl lg:text-[34px] ">{course.title}</h1>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                        <div className="flex-row lg:flex-col pt-6 pb-4">
                            <p className="text-gray-300 text-sm mb-2">Kursus dari: </p>
                            <p className="font-normal text-white">{course.mentor.companyName}</p>
                        </div>

                        <div className="flex-row lg:flex-col lg:pt-6 pb-4">
                            <p className="text-gray-300 text-sm ">Rating: </p>
                            <div className="flex justify-start lg:justify-center items-center ">
                                <ReactStars 
                                    count={5}
                                    value={course.rating} 
                                    size={26} 
                                    color2={'#ffd700'}
                                    className="items-start "
                                    edit={false}
                                />
                                <span className="pl-2 text-md">{course.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row my-8">
                <div className="lg:w-[60%] p-0 lg:pr-8 mb-4">
                    <h1 className="font-bold text-2xl my-4 text-center">Silabus Kelas</h1>
                    <div className="join join-vertical w-full rounded-lg bg-white">
                        <div className="collapse collapse-arrow join-item border-base-300 border">
                            <input type="radio" name="my-accordion-4" defaultChecked />
                            <div className="collapse-title text-xl font-medium">{course.modul1title}</div>
                            <div className="collapse-content">
                                <p>{course.modul1desc}</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item border-base-300 border">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">{course.modul2title}</div>
                            <div className="collapse-content">
                                <p>{course.modul2desc}</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item border-base-300 border">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">{course.modul3title}</div>
                            <div className="collapse-content">
                                <p>{course.modul3desc}</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item border-base-300 border">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">{course.modul4title}</div>
                            <div className="collapse-content">
                                <p>{course.modul4desc}</p>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item border-base-300 border">
                            <input type="radio" name="my-accordion-4" />
                            <div className="collapse-title text-xl font-medium">{course.modul5title}</div>
                            <div className="collapse-content">
                                <p>{course.modul5desc}</p>
                            </div>
                        </div>
                        
                    </div>
                </div>

        
                <div className="lg:w-[40%] shadow-lg rounded-lg bg-white flex-col justify-between my-4">
                    <div className="flex mb-2">
                        <Image src={course.image} width={800} height={800} alt={course.title} />
                    </div>
                    <div className="flex flex-col px-6 py-4 gap-4">
                        <div className="justify-start gap-2">
                            <h1 className="text-gray-800  font-bold text-xl">{course.title}</h1>
                            <p className="text-gray-600">by {course.mentor.companyName}</p>
                        </div>
                        <div className="flex flex-col gap-2 mb-auto">
                            <span className="font-reguler text-sm line-through text-gray-900">{formatterIDR(course.price)}</span>
                            <strong className="font-bold mt-[-4px] text-lg text-gray-900">{formatterIDR(course.discPrice)}</strong>
                        </div>
                        {session.user.role === "STUDENT" ? <Button loading={loading} handleSubmit={handleSubmit} text={"Ambil Kursus"} /> : <Button text={"Ambil Kursus"} />}  
                        
                    </div>   
                </div>
            </div>
        </section>
    )
}