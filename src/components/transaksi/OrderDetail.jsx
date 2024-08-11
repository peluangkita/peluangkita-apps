'use client'
import { useState, useEffect } from "react"
import { useParams,useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";
import axios from "axios"
import Loading from "@/app/(dashboard)/loading"
import TitleCard from "../ui/TitleCard";
import Link from "next/link";

export default function OrderDetail() {
    const {data:session} =  useSession()
    const params = useParams()
    const router = useRouter()
    const [pageLoading,setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [participant, setParticipant] = useState([])
    const [reqCourse, setReqCourses] = useState()

    const getParticipant = async () => { 
        try {
            const res = await axios.get(`/api/courses/participant/detail/${params.partId}`)
            const part = res.data
            console.log(part)
            setParticipant(part);
            setPageLoading(false);
        } catch (err) {
            console.log("[products_GET]", err);
            setPageLoading(false);
        }
    };
    
    useEffect(() => {
        getParticipant();
    }, []);

    if (pageLoading) return <Loading />
    if (participant.payment.length < 1) {
        return(
            <TitleCard title={"Transaction Detail"} topMargin="mt-2" >
                <div className="bg-white mx-auto justify-center items-center p-8">
                    <div className="flex flex-col lg:px-12 items-center justify-center">
                        <h4 className="text-center leading-snug text-primary font-semibold text-xl">Terima kasih telah memilih untuk belajar bersama kami! Saat ini, kami menggunakan metode pembayaran manual. Silakan lakukan pembayaran ke rekening yang tertera di bawah ini:</h4>
                    </div>
                    <div className="flex flex-row mx-auto justify-center items-center gap-14 my-14">
                        <div className="flex flex-col justify-center">
                            <div className="text-gray-600">{participant.course.mentor.bankName}</div>
                            <div className="text-gray-600">Nomor Rekening: <span className="font-bold">{participant.course.mentor.bankNumber}</span> </div>
                            <div className="text-gray-600">Atas Nama: <span className="font-bold">{participant.course.mentor.bankAccName}</span> </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-gray-600">{participant.course.mentor.bank2Name}</div>
                            <div className="text-gray-600">Nomor Rekening: <span className="font-bold">{participant.course.mentor.bank2Number}</span> </div>
                            <div className="text-gray-600">Atas Nama: <span className="font-bold">{participant.course.mentor.bank2AccName}</span> </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:px-12 items-center justify-center gap-4">
                        <h4 className="text-center leading-snug text-gray-600 font-reguler text-md">Setelah melakukan transfer, harap konfirmasi dengan mengirimkan bukti transfer ke halaman website berikut untuk dikonfirmasi oleh penyedia kursus. Kami akan memproses pendaftaran Anda setelah pembayaran dikonfirmasi.</h4>
                        <h4 className="text-center leading-snug text-gray-600 font-reguler text-md">Terima kasih atas pengertiannya dan selamat belajar!</h4>
                    </div>
                    <div className="mt-8 flex mx-auto justify-center items-center">
                        <Link 
                            href={`/order/confirmation/${participant.id}`} 
                            className="btn btn-primary text-white text-center"
                        >
                            Konfirmasi Pembayaran 
                        </Link>
                    </div>
                </div>
            </TitleCard>
        )
    } else if (participant.payment.accepted === false) {
        return (
            <TitleCard title={"Transaction Detail"} topMargin="mt-2" >
            <div className="bg-white mx-auto justify-center items-center p-4 lg:p-8">
                <div className="flex flex-col lg:px-12 mb-8 ">
                    <h4 className="text-center leading-snug text-primary font-semibold text-xl">Menunggu Konfirmasi Pembayaran</h4>
                </div>
                <div className="flex flex-col lg:px-12 gap-4">
                    <h4 className="text-center leading-snug text-gray-600 font-reguler text-md">Terima kasih telah melakukan konfirmasi pembayaran! Saat ini, pembayaran Anda sedang dalam proses verifikasi oleh tim kami.</h4>
                    <h4 className="text-center leading-snug text-gray-600 font-reguler text-md">Harap bersabar, proses ini biasanya memerlukan waktu beberapa saat. Anda akan menerima notifikasi segera setelah pembayaran Anda berhasil diverifikasi dan akses ke kursus dibuka.</h4>
                    <h4 className="text-center leading-snug text-gray-600 font-reguler text-md">Jika ada pertanyaan atau Anda belum menerima konfirmasi dalam waktu 1 X 24 jam, silakan hubungi kami untuk bantuan lebih lanjut.</h4>
                </div>
            </div>
        </TitleCard>
        )
    } 
    return (
        <TitleCard title={"Transaction Detail"} topMargin="mt-2" >
            <div className="bg-white lg:w-[60%] mx-auto justify-center items-center py-4 ">
                <div className="flex flex-col mb-8 ">
                    <h4 className="text-center leading-snug text-primary font-semibold text-xl">Konfirmasi Pembayaran Berhasil!</h4>
                </div>
                <div className="flex flex-col gap-4">
                    <h4 className="text-center leading-snug text-gray-600 font-reguler text-md">Terima kasih! Kami telah menerima konfirmasi pembayaran Anda. Tim kami akan segera memverifikasi transaksi Anda.</h4>
                    <h4 className="text-center leading-snug text-gray-600 font-reguler text-md">Setelah pembayaran Anda diverifikasi, Anda akan menerima pemberitahuan melalui email atau WhatsApp. Kami senang Anda bergabung dalam perjalanan belajar ini!</h4>
                    <h4 className="text-center leading-snug text-gray-600 font-reguler text-md">Jika Anda memiliki pertanyaan atau membutuhkan bantuan lebih lanjut, jangan ragu untuk menghubungi kami. Selamat belajar!</h4>
                </div>
            </div>
        </TitleCard>
    )
    
}