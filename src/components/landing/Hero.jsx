'use client'
import React from "react"
import { HOME_BANNER } from "@/constants/routes";
import Slider from "react-slick";
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function Hero() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        autoplay: true,
        autoplaySpeed: 3500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
    return (
        <div className="my-6 px-4 md:px-6 max-w-[78rem] mx-auto">
            {/* <div className="flex gap-4">
                {TRENDING_CATEGORIES.slice(0, 2).map((category) => (
                    <ProductCategoryCard key={category.key} category={category} size="xl" />
                ))}
            </div> */}
            
            <Slider {...settings} className="my-4">
                {HOME_BANNER.map((banner)=>(
                    <img key={banner.key} src={banner.image} className="rounded-lg" alt="banner.key"/>
                ))}
            </Slider>

            <Link href="/login" className="flex bg-primary my-10 p-4 rounded-lg justify-between items-center" >
                <div className="flex flex-row justify-center items-center align-center gap-2">
                    <h3 className="text-white"> Konsultasi untuk tentukan pilihan karirmu</h3>
                    <div className="tooltip" data-tip="Karir Konsultan Peluangkita adalah individu berpengalaman yang terlatih untuk menjawab pertanyaan pengguna, dengan strategi dan jawaban yang akan mengarahkan pengguna dalam membangun karirnya.">
                        <IoIosInformationCircleOutline size={20} className="text-white" /> 
                    </div>
                </div>
                <FaArrowRight size={20} className="w-10 text-white" />
            </Link>

            
        </div>
        
    )
}

export default Hero
