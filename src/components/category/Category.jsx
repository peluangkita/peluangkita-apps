'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import TitleCard from "../ui/TitleCard";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import Loading from "@/app/(dashboard)/loading";
import { RiDeleteBin5Fill } from "react-icons/ri";
import InputField from "../ui/InputField";

const TopSideButtons = () => {
    const [loading, setLoading] = useState(true)
    const [formValues, setFormValues]  = useState({
        name: "",
    })
    const { name} = formValues;

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
            const response = await fetch("/api/courses/category", {
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
                        label="Category Name"
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

    const handleDelete = async (value) => {
        const approval = confirm("Apakah kamu yakin ingin menghapus?")

        if (approval) {
            await fetch('/api/courses/category', { 
                method: "DELETE", 
                body: JSON.stringify(value),
                headers: {"Content-Type": "application/json",} 
            });
            location.reload()
        }
    }

    if(loading) return <Loading />
    return (
        <TitleCard title={"Category"} topMargin="mt-2" TopSideButtons={<TopSideButtons/>}>
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
                                        <div className="tooltip" data-tip="Delete Data">
                                            <RiDeleteBin5Fill 
                                                onClick={() => handleDelete(cat.id)} 
                                                className="text-primary cursor-pointer p-1 text-3xl"
                                            />
                                        </div>
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
