import ProductsCardDetail from "@/components/landing/ProductsCardDetail"
import CategoryTrending from "@/components/landing/CategoryTrending"
export default function ProductsDetail({ params }) {
    return (
      <>
        <ProductsCardDetail params={params} />
        <CategoryTrending />
      </>
    )
  }