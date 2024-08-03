'use client'
import { useState, useEffect } from "react"
import { useParams } from 'next/navigation'
import ReactStars from 'react-stars'
import Image from 'next/image'
import Link from "next/link"
import axios from "axios"
import { formatterIDR } from "@/lib/utils"
import Loading from "@/app/(root)/loading"

export default function ProductsCardDetail() {
    const params = useParams()
    const [loading,setLoading] = useState(true)
    const [course, setCourse] = useState({})

    const getCourse = async () => { 
        try {
            const response = await axios.get(`/api/courses/detail/${params.courseId}`)
            const data = response.data;
            setCourse(data);
            setLoading(false);
        } catch (err) {
            console.log("[products_GET]", err);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getCourse();
    });

    if(loading) return <Loading/> 
    return(
        <section>
            <div className="bg-[url('/Banner.png')] lg:h-[400px]">
                <div className="flex flex-col max-w-[78rem] h-full mx-auto p-8 lg:p-10">
                    <div className="pt-4 lg:pt-12 text-white">
                        <div className="justify-center ">
                            <h1 className="font-bold leading-snug text-white text-3xl lg:text-[44px] ">{course.title}</h1>
                            {/* <p className="font-normal text-gray-300">{product.description}</p> */}
                        </div>
                        <div className="flex gap-10">
                            <div className="flex-col py-6">
                                <p className="text-gray-300 text-sm mb-2">Kursus dari: </p>
                                <p className="font-normal text-white">{course.mentor.companyName}</p>
                            </div>

                            <div className="flex flex-col py-6">
                                <p className="text-gray-300 text-sm ">Rating: </p>
                                <div className="flex justify-center items-center ">
                                    <ReactStars 
                                        count={5}
                                        value={course.rating} 
                                        size={26} 
                                        color2={'#ffd700'}
                                        className="items-start "
                                        edit={false}
                                    />
                                    <span className="pl-2 text-md text-white">{course.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto lg:max-w-[78rem] p-6 lg:p-12">
                <div className="flex flex-col shadow-lg rounded-lg mt-2 lg:mt-[-6rem] mb-8 bg-white">
                    <div className="px-8 py-6 lg:py-10">
                        <h2 className="text-center font-semibold text-[26px] text-gray-800 mb-4">Tentang kursus</h2>
                        <p className="text-gray-500 text-justify">{course.description}</p>
                    </div>
                </div>
            </div>

            {/* <div className="mx-auto lg:w-[78rem] p-6 lg:p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex flex-col text-left p-6">
                        <h2 className="text-center font-semibold text-[26px] text-gray-800 mb-4">Silabus Kursus</h2>
                        <p className="text-gray-500">{course.description}</p>
                    </div>
                    <div className="flex flex-wrap justify-end">
                        <div className="rounded-xl shadow-lg p-6">
                            <div className="flex mb-6">
                                <Image src={course.image} width={500} height={500} alt={course.title} />
                            </div>
                            <div className="flex flex-col gap-4">
                                <p className="text-gray-800 justify-start font-bold text-2xl">{course.title}</p>
                                <div className="card-actions items-end">
                                    <strong className="font-semibold text-gray-900">{formatterIDR(course.price)}</strong>
                                </div>
                                <Link href={"/login"} className="bg-primary rounded-md text-center text-white px-4 py-2" >Ambil kursus</Link>
                            </div>   
                        </div>
                    </div>
                </div>
            </div> */}

            
            <div className="flex flex-col mx-auto lg:max-w-[78rem] lg:flex-row mb-8 p-6">
                <div className="lg:w-[60%] p-0 lg:pr-16 mb-4">
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
                    <div className="flex flex-col p-6 gap-4">
                        <p className="text-gray-800 justify-start font-bold text-2xl">{course.title}</p>
                        
                        <div className="flex flex-col gap-2">
                            <span className="font-reguler text-sm line-through text-gray-900">{formatterIDR(course.price)}</span>
                            <strong className="font-bold mt-[-4px] text-lg text-gray-900">{formatterIDR(course.discPrice)}</strong>
                        </div>  
                        <Link href={"/login"} className="bg-primary rounded-md text-center text-white px-4 py-2" >Ambil kursus</Link>
                    </div>   
                </div>
            </div>
        </section>
    )
}