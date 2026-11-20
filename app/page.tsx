import HeroSection from "@/components/home/HeroSection"
import FeaturedEquipmentSection from "@/components/home/FeaturedEquipmentSection"
import CategoriesSection from "@/components/home/CategoriesSection"
import { getHomePageDataApi } from "@/lib/services/getApi"

export default async function HomePage() {
  const homeRes = await getHomePageDataApi()

  const featuredEquipments = homeRes.data?.featuredEquipment ?? []
  const categories = homeRes.data?.categories ?? []

  return (
    <main className="flex-1">
      <HeroSection />
      <FeaturedEquipmentSection equipments={featuredEquipments} />
      <CategoriesSection categories={categories} />
    </main>
  )
}