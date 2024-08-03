import Image from "next/image"
import Link from "next/link"
import React from "react"
import { formatterIDR } from "@/lib/utils"
import { GiCheckMark } from "react-icons/gi";

function ProductsCard({ product }) {
    const { image, title, mentor, description, price, id, discPrice, benefit1, benefit2 } = product
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
                {/* <div className="flex flex-row">
                    <GiCheckMark/>
                    <p className="text-gray-800 justify-start font-normal mb-2">by {benefit1}</p>
                </div>
                <div className="flex-row">
                    <GiCheckMark/>
                    <p className="text-gray-800 justify-start font-normal mb-2">by {benefit2}</p>
                </div>
                <p className="leading-tight justify-start text-gray-400 text-[12px] lg:text-[14px] font-light">{description.substr(0, 180)}{"..."}</p> */}
            </div>   
            <div className="flex flex-col px-4 pb-4 gap-2">
                <span className="font-reguler text-sm line-through text-gray-900">{formatterIDR(price)}</span>
                <strong className="font-bold mt-[-4px] text-lg text-gray-900">{formatterIDR(discPrice)}</strong>
            </div>  
        </Link>
    )
}

export default ProductsCard
