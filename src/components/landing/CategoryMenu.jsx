"use client"
import { CATEGORY_LINKS } from "@/constants/routes"
import Link from "next/link"
import {useEffect,useState} from "react"
import { RiMenu2Line } from "react-icons/ri"
import axios from "axios"
export default function CategoryMenu() {
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState([])

    // const getCategory = async () => { 
    //     try {
    //         const response = await axios.get("/api/courses/category")
    //         const data = response.data;
    //         console.log("course:", data)
    //         setCategory(data);
    //         setLoading(false);
    //     } catch (err) {
    //         console.log("[products_GET]", err);
    //         setLoading(false);
    //     }
    // };
    
    // useEffect(() => {
    //     getCategory();
    // }, []);

    useEffect(() => {
        async function fetchData() {
          // Fetch data
          const { data } = await axios.get("/api/courses/category");
          const results = []
          console.log("my category :", data)
          data.forEach((value) => {
            results.push({
              label: value.name,
              value: value.id,
              link: `/api/courses/category/${value.name}`,
            });
          });
  
          setCategory([
            ...results
          ])
        }
    
        // Trigger the fetch
        fetchData();
      }, []);

    return (
        <div className="border-b border-b-gray-300 text-gray-500">
            <div className="max-w-[78rem] mx-auto px-2">
                <div className="py-3">
                    <ul className="flex overflow-hidden relative items-center gap-2 text-sm">
                        <Link
                            href={"/categories"}
                            className="hover:opacity-70 transition-opacity flex items-center gap-2"
                        >
                            <RiMenu2Line fontSize={18} />
                            Semua Kategori
                        </Link>
                        <div className="overflow-x-auto w-full flex">
                           
                            <div className="flex flex-row gap-4 lg:gap-6 justify-center items-center">
                                {category.map((cat, idx) => (
                                    <Link key={idx} href={cat.link} className="hover:opacity-80 transition-opacity pr-6 border-r-2">
                                        {cat.label} 
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

