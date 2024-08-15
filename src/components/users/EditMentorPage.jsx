'use client'
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useParams, useRouter } from 'next/navigation'
import TitleCard from "../ui/TitleCard"
import InputField from "../ui/InputField"
import SelectField from "../ui/SelectField"
import Loading from "@/app/(dashboard)/loading"
import toast from "react-hot-toast";
import moment from "moment"
import axios from "axios"
import ImageUpload from "../ui/ImageUpload"
import Button from "../ui/Button"

export default function EditMentorPage() {
    const params = useParams()
    const router = useRouter()
    const {data:session} = useSession()
    const [pageLoading, setPageLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState()
    const [currentAccount, setCurrentAccount] = useState({})
    const [account, setAccount] = useState({})
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
    } = formValues;

    const getProfileData = async () => {
        try {  
            const res = await axios.get(`/api/profile/mentor/${params.mentorId}`);
            const profile  = res.data
            console.log("profile data :", profile)
            setFormValues(profile)
            setAccount({mentorId : profile.id, accountId : (profile.account.length >= 1 ? profile.account[0].id : '')})
            if( profile.account.length >= 1) {
                setCurrentAccount(profile.account[0])
            }
            setPageLoading(false);
        } catch (err) {
          console.log("[collections_GET]", err);
          setPageLoading(false);
        }
      };

    async function fetchPackage() {
    // Fetch data
        const { data } = await axios.get("/api/account/package");
        const results = []
        data.forEach((value) => {
            results.push({
            label: value.name,
            value: value.id,
            });
        });

        setOptions([
            {key: 'Select a company', value: ''}, 
            ...results
        ])
    }

    useEffect(() => {
        getProfileData();
        fetchPackage()
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

    const handleSelect = (value, meta) => {
        setAccount({...account, [meta.name]: value.value});
        console.log(account)
    };

    async function handleSubmit() {
        console.log(account)
        setLoading(true);
        try {
            console.log(formValues)
            const response = await fetch(`/api/profile/mentor/${params.mentorId}`, {
                method: "POST",
                body: JSON.stringify(account),
                headers: {
                "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            toast.success("Account Update Success");
            router.push('/mentor')
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

                <h1 className="font-semibold text-lg mt-6">Account Manager</h1>
                <div className="divider" ></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectField
                        defaultValue={(currentAccount.package ? options.find(({value}) => value === currentAccount.package.id) : '')}
                        label="Account Mentor"
                        name="packageId"
                        options={options}
                        onChange={(value, meta) => handleSelect(value, meta)}
                    />
                     <InputField
                        type="text"
                        value={(currentAccount.package ? moment(currentAccount.expiredAt).format("DD MMMM YYYY") : '')}
                        label="Expired At"
                        name="expiredAt"
                        readOnly='readOnly'
                    />
                </div>
                <div className="divider" ></div>

                <Button handleSubmit={handleSubmit} loading={loading} text={'Update Mentor Account'} />
            </TitleCard>
        </>
    )
}