'use client'
import { useState, useEffect } from "react";
import { useParams,useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";
import TitleCard from "../ui/TitleCard";
import Link from "next/link";
import axios from "axios";
import { formatterIDR } from "@/lib/utils";
import toast from "react-hot-toast";
import Loading from "@/app/(dashboard)/loading";

export default function ConsultationChat() {
    const {data:session} =  useSession()
    const params = useParams()
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState([]);
    const [sendMessage, setSendMessage] = useState({
        text : "",
        senderId: session?.user.id,
        receiverId:'',
        conversationId: params.consultationId,
        image:''
    })

    useEffect(() => {
        async function getMessage() {
            const response = await axios.get(`/api/consultation/message/${params.consultationId}`)
            const data = response.data;
            console.log(data)
            setMessage(data);
            setLoading(false);
        }
        getMessage();
    }, [params.consultationId]);

 
    async function handleSendMessage() {
        try {
          const response = await fetch('/api/consultation/message', {
            method: "POST",
            body: JSON.stringify(sendMessage),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            // location.reload()
            // toast.success("Berhasil Memilih Kelas");
            // router.push('/course')
        } 
        } catch (error) {
          console.error("Network Error:", error);
        }
      }

      const handleChange = (e) => {
        const { name, value } = e.target;
        setSendMessage((prev) => ({
          ...prev,
          [name]: value,
        }));
        console.log(sendMessage);
      };

    if (loading) return <Loading />
    return(
        <>
            <TitleCard title={"Consultation"} topMargin="my-2">
                <div className="flex flex-col justify-between h-[calc(100vh_-_270px)] w-full overflow-hidden">
                    <div className="mb-auto max-h-full overflow-y-auto">
                        {
                            message.map(msg => {
                                return (
                                    <div key={msg.id} className={`chat ${msg.senderId === session?.user.id ? "chat-end" : "chat-start"}`}>
                                        <div className="chat-bubble">{msg.text}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="flex pt-10">
                        <form onSubmit={handleSendMessage} className="flex w-full">
                            <input value={sendMessage.text} onChange={handleChange} name="text" className="input w-full focus:outline-none bg-gray-100 rounded-r-none" type="text" />
                            <button type="submit" className="w-auto bg-primary text-white rounded-r-lg px-5 text-sm">Send</button>
                        </form>
                    </div>
                </div>
            </TitleCard>
        </>
    )
    
}
