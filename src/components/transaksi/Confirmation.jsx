'use client'
import { useState, useEffect } from "react"
import { useParams,useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";
import TitleCard from "../ui/TitleCard"
import InputField from "../ui/InputField"
import SelectField from "../ui/SelectField"
import toast from "react-hot-toast";
import axios from "axios"
import ImageUpload from "../ui/ImageUpload"
import Button from "../ui/Button";

export default function Confirmation() {
    const {data:session} =  useSession()
    const params = useParams()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formValues, setFormValues] = useState({
        image: '',
        participantId: params.partId,
        status:''
    })

   

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
      console.log(formValues);
    };

    const saveAvatar = (url) => {
      setFormValues(formValues => ({
          ...formValues,
          image : url
      }))
    }

    async function handleSubmit() {
        setLoading(true)
        console.log(formValues)
        try {
          const response = await fetch("/api/courses/transaction", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
              "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Berhasil Mengirim Bukti Pembayaran");
            router.push('/order')
        } 
        } catch (error) {
          console.error("Network Error:", error);
        }
      }

    return(
      <TitleCard title="Payment Confirmation" topMargin="mt-2"  >
        <div className="flex flex-col gap-2 mb-8">
            <ImageUpload 
                onUploadSuccess={saveAvatar} 
                url={formValues.image} 
                sizes="w-[400px] h-[200px]" 
                btnWidth="w-[400px]" 
            />
            <InputField
                type="text"
                value={formValues.status}
                placeholder="Note to mentor"
                label="Note"
                name="status"
                onChange={handleChange}
            />
        </div>
        <Button handleSubmit={handleSubmit} text={"Submit Payment Confirmation"} loading={loading} />
      </TitleCard>
    )
}

