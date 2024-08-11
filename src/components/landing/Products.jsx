"use client"
import {useEffect,useState} from "react"
import axios from "axios"
import ProductsCard from "./ProductsCard"

function Products() {
    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([])

    const getAllCourses = async () => { 
        try {
            const response = await axios.get("/api/courses")
            const data = response.data;
            console.log("course:", data)
            setCourses(data);
            setLoading(false);
        } catch (err) {
            console.log("[products_GET]", err);
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getAllCourses();
    }, []);

    if(courses) {
        return (
            <div className="my-10 px-6  max-w-[78rem] mx-auto">
                <h3 className="mb-4 text-xl text-gray-800 font-semibold">Rekomendasi Kelas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {courses.map((course, idx) => (
                        <ProductsCard key={idx} product={course} loading={loading} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Products
