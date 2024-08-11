import Image from "next/image"
import Link from "next/link"
import React from "react"
import { formatterIDR } from "@/lib/utils"

function ProductsCard({ product, loading }) {
    const { image, title, mentor, price, id, discPrice, } = product
    if (loading) return (
        <div className="flex w-52 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    )
    return (
        <Link
            href={`/courses/detail/${id}`}
            className="card shadow-lg rounded-lg bg-white flex flex-col my-2"
        >
            <div>
                <Image src={image} width={400} height={300} alt="" className="rounded-lg" />
            </div>
            <div className="flex flex-col p-4 mb-auto">
                <p className="text-gray-800 justify-start font-bold">{title}</p>
                <p className="text-gray-500 justify-start text-sm font-normal mt-2">by {mentor.companyName}</p>
            </div>   
            <div className="flex flex-col px-4 pb-4 gap-2">
                <span className="font-reguler text-sm line-through text-gray-900">{formatterIDR(price)}</span>
                <strong className="font-bold mt-[-4px] text-lg text-gray-900">{formatterIDR(discPrice)}</strong>
            </div>  
        </Link>
    )
}

export default ProductsCard
