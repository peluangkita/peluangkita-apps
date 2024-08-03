// import Link from "next/link"
// import Header from "@/components/landing/header"
// import Hero from "@/components/landing/hero"
// import About from "@/components/landing/about"
// import Program from "@/components/landing/program"

import Hero from "@/components/landing/Hero"
import Products from "@/components/landing/Products"
import CategoryTrending from "@/components/landing/CategoryTrending"

export default function Home() {
  return (
    <div className="container">
      <Hero/>
      <Products/>
      <CategoryTrending />
    </div>
  )
}
