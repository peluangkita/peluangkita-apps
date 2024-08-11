'use client'
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import TitleCard from "../ui/TitleCard"
import InputField from "@/components/ui/InputField"
import toast from "react-hot-toast";
import ImageUpload from "../ui/ImageUpload"
import Button from "../ui/Button"
import Loading from "@/app/(dashboard)/loading"

export default function Profile(){
    const {data:session} =  useSession()
    const [loading, setLoading] = useState(false)
    const [pageLoading, setPageLoading] = useState(true)
    const [avatar, setAvatar] = useState(null)
    const [formValues, setFormValues]  = useState({})
    const { 
        name, 
        email, 
        image, 
        phone, 
        title, 
        about, 
        companyName, 
        companyAddress, 
        bankName    ,  
        bankAccName ,  
        bankNumber  ,  
        bank2Name   ,  
        bank2AccName,  
        bank2Number ,  
        bank3Name   ,  
        bank3AccName,  
        bank3Number    
    } = formValues;

    const getProfileData = async () => {
        try {  
            const res = await axios.get('/api/profile/detail');
            const profile  = res.data
            console.log("profile data :", profile)
            if(profile.length !== 0) {
                setFormValues(profile)
            }
            setPageLoading(false);
        } catch (err) {
          console.log("[collections_GET]", err);
          setPageLoading(false);
        }
      };

    useEffect(() => {
    getProfileData();
    }, []);


    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value});
        console.log(formValues);
    };

    const saveAvatar = (url) => {
        setFormValues(formValues => ({
            ...formValues,
            image : url
        }))
    }

    async function handleSubmit() {
        setLoading(true);
        try {
            console.log(formValues)
            const response = await fetch("/api/profile/detail", {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Profile Update Success");
            setLoading(false);
          } 
        } catch (error) {
          console.error("Network Error:", error);
          setLoading(false);
        }
    }
    
    if(pageLoading) return <Loading />
    return(
        <>
            <TitleCard title="Profile" topMargin="mt-2"  >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="row-span-3">
                        <ImageUpload onUploadSuccess={saveAvatar} url={image} sizes="w-[200px] h-[200px]" />
                    </div>
                    <InputField
                        type="text"
                        value={name}
                        label="Full Name"
                        placeholder="John Doe"
                        name="name"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={title}
                        label="Title"
                        placeholder="Developer & Instructor"
                        name="title"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={about}
                        label="About"
                        placeholder="Tell about you.."
                        name="about"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={email}
                        label="Email"
                        placeholder="name@company.com"
                        name="email"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={phone}
                        label="Phone Number"
                        placeholder="(+62) XXXXXXXXX"
                        name="phone"
                        onChange={handleChange}
                    />
                     <InputField
                        type="text"
                        value={companyName}
                        label="Company Name"
                        placeholder="PT Media School"
                        name="companyName"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={companyAddress}
                        label="Company Address"
                        placeholder="Merdeka Street No.20"
                        name="companyAddress"
                        onChange={handleChange}
                    />
                </div>

                <h1 className="font-semibold text-lg mt-6">Bank Credentials</h1>
                <div className="divider" ></div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <InputField
                        type="text"
                        value={bankName}
                        label="Bank Name"
                        placeholder="Bank Central Asia"
                        name="bankName"
                        onChange={handleChange}
                    />
                     <InputField
                        type="text"
                        value={bankAccName}
                        label="Account Name"
                        placeholder="John Doe / Company"
                        name="bankAccName"
                        onChange={handleChange}
                    />
                     <InputField
                        type="text"
                        value={bankNumber}
                        label="Account Number"
                        placeholder="XXXXXXXXXX"
                        name="bankNumber"
                        onChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={bank2Name}
                        label="Bank Name"
                        placeholder="Bank Central Asia"
                        name="bank2Name"
                        onChange={handleChange}
                    />
                     <InputField
                        type="text"
                        value={bank2AccName}
                        label="Account Name"
                        placeholder="John Doe / Company"
                        name="bank2AccName"
                        onChange={handleChange}
                    />
                     <InputField
                        type="text"
                        value={bank2Number}
                        label="Account Number"
                        placeholder="XXXXXXXXXX"
                        name="bank2Number"
                        onChange={handleChange}
                    />
                </div>
                <div className="divider" ></div>

                <Button handleSubmit={handleSubmit} loading={loading} text={'Update Profile'} />
            </TitleCard>
        </>
    )
}

