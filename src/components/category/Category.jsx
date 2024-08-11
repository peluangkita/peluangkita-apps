'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import TitleCard from "../ui/TitleCard";
import Link from "next/link";
import axios from "axios";
import moment from "moment";
import Loading from "@/app/(dashboard)/loading";
import { RiDeleteBin5Fill } from "react-icons/ri";


const TopSideButtons = () => {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [formValues, setFormValues]  = useState({
        name: "",
        supervisorId: params.partnerId, 
        email:"", 
        address:"",
        phone: ""
    })
    const { name, email, address, phone} = formValues;

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;

        setFormValues({ ...formValues, [name]: value});
        console.log(formValues);
    };

    async function handleSubmit() {
        setLoading(true);
        console.log(formValues)
        try {
            const response = await fetch(`/api/data/partner/${params.partnerId}`, {
                method: "POST",
                body: JSON.stringify(formValues),
                headers: {
                "Content-Type": "application/json",
            },
          })
          
          if (response.ok) {
            setLoading(false);
            toast.success("Category Created");
            document.getElementById('attend_modal').close()
            location.reload();
          } 
        } catch (error) {
          setLoading(false);
          console.error("Network Error:", error);
        }
      }


    return(
        <div className="inline-block lg:float-right">
            <button className="btn px-4 btn-sm normal-case bg-primary hover:bg-secondary text-white" onClick={()=>document.getElementById('attend_modal').showModal()} >Create Category</button>
            <dialog id="attend_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-white">
                <h3 className="text-md text-center mb-4">Create New Catgory</h3>
                <form className="grid grid-cols-1 gap-6">
                    <InputField
                        type="text"
                        value={name}
                        label="Nama Perusahaan"
                        name="name"
                        onChange={handleChange}
                    />
                </form>
                <div className="modal-action">                    
                <form method="dialog">
                    <button className="btn btn-ghost">Close</button>
                </form>
                <button className="btn bg-secondary hover:bg-black text-white" type='submit' onClick={() => handleSubmit()}>Submit</button>
                </div>
            </div>
            </dialog>
        </div>
    )
}


export default function Category() {
    const {data:session} =  useSession()
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);

    const getCategory = async () => { 
        try {
            const response = await axios.get("/api/courses/category")
            const data = response.data;
            console.log(data)
            setCategory(data);
            setLoading(false);
        } catch (err) {
            console.log("[products_GET]", err);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getCategory();
    }, []);

    if(loading) return <Loading />
    return (
        <TitleCard title={"Category"} topMargin="mt-2" >
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead >
                    <tr className="font-bold text-primary text-[14px]">
                        <th>No</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {   
                            category.map((cat, idx) =>{
                                return (
                                    <tr key={idx} className="text-grey ">
                                    <td>{idx+1}</td>
                                    <td>{cat.name}</td>
                                    <td className="flex items-center">
                                        <Link href={`/order/detail/${cat.id}`}>
                                            <RiDeleteBin5Fill 
                                                className="text-primary hover:text-secondary cursor-pointer p-1 text-3xl"
                                            />
                                        </Link>
                                    </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    );
}
