import HeroSection from "@/components/home/HeroSection"
import FeaturedEquipmentSection from "@/components/home/FeaturedEquipmentSection"
import CategoriesSection from "@/components/home/CategoriesSection"
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection"
import HowItWorksSection from "@/components/home/HowItWorksSection"
import StatsAndReviewsSection from "@/components/home/StatsAndReviewsSection"
import OwnerCtaSection from "@/components/home/OwnerCtaSection"
import { getHomePageDataApi } from "@/lib/services/getApi"

interface ExtendedHomeData {
  stats?: {
    totalEquipment?: number
    totalOwners?: number
    verifiedOwners?: number
    completedBookings?: number
    totalBookings?: number
    averageRating?: number
  }
  reviews?: Array<{
    _id: string
    equipmentId?: string
    equipmentName?: string
    category?: string
    customerName: string
    rating: number
    comment: string
    createdAt?: string
  }>
}

export default async function HomePage() {
  const homeRes = await getHomePageDataApi()

  const featuredEquipments = homeRes.data?.featuredEquipment ?? []
  const categories = homeRes.data?.categories ?? []
  const extraData = (homeRes.data ?? {}) as ExtendedHomeData

  return (
    <main className="flex-1 overflow-x-clip">
      <HeroSection />
      <FeaturedEquipmentSection equipments={featuredEquipments} />
      <CategoriesSection categories={categories} />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <StatsAndReviewsSection
        stats={extraData.stats}
        reviews={extraData.reviews}
      />
      <OwnerCtaSection />
    </main>
  )
}