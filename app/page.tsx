import HeroSection from "@/components/home/HeroSection"
import FeaturedEquipmentSection from "@/components/home/FeaturedEquipmentSection"
import CategoriesSection from "@/components/home/CategoriesSection"
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection"
import HowItWorksSection from "@/components/home/HowItWorksSection"
import StatsAndReviewsSection from "@/components/home/StatsAndReviewsSection"
import OwnerCtaSection from "@/components/home/OwnerCtaSection"
import {
  getHomePageDataApi,
  getLatestReviewsApi,
} from "@/lib/services/getApi"

export default async function HomePage() {
  const [homeRes, reviewsRes] = await Promise.all([
    getHomePageDataApi(),
    getLatestReviewsApi(4),
  ])

  const featuredEquipments = homeRes.data?.featuredEquipment ?? []
  const categories = homeRes.data?.categories ?? []
  const stats = homeRes.data?.stats
  const reviews =
    homeRes.data?.reviews && homeRes.data.reviews.length > 0
      ? homeRes.data.reviews
      : (reviewsRes.data ?? [])

  return (
    <main className="flex-1 overflow-x-clip">
      <HeroSection />
      <FeaturedEquipmentSection equipments={featuredEquipments} />
      <CategoriesSection categories={categories} />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <StatsAndReviewsSection stats={stats} reviews={reviews} />
      <OwnerCtaSection />
    </main>
  )
}