import React from "react"
import Link from "next/link"
import Image from "next/image"
import { KATEGORI_KELAS } from "@/constants/routes"

function CategoryTrending() {
    return (
        <div className="my-10 px-4 md:px-6 max-w-[78rem] mx-auto">
            <h3 className="mb-4 text-xl font-medium text-gray-800 font-semibold">Kategori Kelas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {KATEGORI_KELAS.map((category,i) => (
                    <Link href="/product" key={i} className="relative flex-1 block group rounded-lg overflow-hidden border border-gray-300">
                        <Image
                            alt={category.name}
                            src={category.image}
                            width={300}
                            height={150}
                            className="object-cover w-full aspect-video group-hover:scale-105 transition-transform"
                        />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryTrending
