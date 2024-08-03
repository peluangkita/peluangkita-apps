'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from 'next/navigation'
import TitleCard from "../ui/TitleCard";
import InputField from "../ui/InputField";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { formatterIDR } from "@/lib/utils";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import Loading from "@/app/(dashboard)/loading";
import { GiCheckMark } from "react-icons/gi";

const benefit = [
    {
        value: "Konsultasi Personal"
    },
    {
        value: "Penilaian Minat dan Bakat:"
    },
    {
        value: "Rencana Karir Terstruktur"
    },
    {
        value: "Dukungan Berkelanjutan"
    },
]

export default function Consultation() {
    const {data:session} =  useSession()
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [consultation, setConsultation] = useState({
        userId : session?.user.id
    });

    const getConsultData = async () => { 
        try {
            const response = await axios.get("/api/consultation")
            const data = response.data;
            console.log(data)
            if(data) {
                router.push(`/consultation/${data.id}`)
            }
            setLoading(false);

        } catch (err) {
            console.log("[products_GET]", err);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getConsultData();
    });

    async function handleSubmit() {
        setLoading(true)
        try {
          const response = await fetch("/api/consultation/", {
            method: "POST",
            body: JSON.stringify(consultation),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            // location.reload()
            setLoading(false)
          }
        } catch (error) {
          console.error("Network Error:", error);
            setLoading(false)
        }
      }

    if (loading) return <Loading />
    return(
        <>
        <div className="bg-white h-[calc(100vh_-_120px)] items-center p-8">
            <div className="flex flex-col lg:px-12 mb-8 items-center justify-center">
                <Image src="/Consultation.jpg" width={300} height={200} alt="Konsultasi" />
                <h1 className="text-center leading-snug text-primary font-extrabold text-2xl my-4">Temukan jalan karirmu bersama PeluangKita</h1>
                <p className="text-center leading-snug text-gray-400 font-normal text-sm">Dapatkan panduan karir yang tepat dari para ahli. Mulai dari pemilihan jurusan hingga strategi pencarian kerja, kami siap membantu kamu menemukan passion dan mencapai kesuksesan</p>
            </div>

            <div className="grid grid-cols-2 lg:w-[70%] mx-auto">
                {
                    benefit.map(x => {
                        return (
                            <div key={x.value} className="flex flex-row items-center">
                                <GiCheckMark className="mr-2" />
                                <div className="text-gray-500">{x.value}</div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="mt-8 flex mx-auto justify-center items-center"><button className="btn btn-primary text-white text-center" onClick={() => handleSubmit()}>Konsultasi Sekarang</button></div>
        </div>
        </>
    )
    
}
