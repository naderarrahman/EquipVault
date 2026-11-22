import type { Metadata } from "next"
import HowItWorksContent from "@/components/how-it-works/HowItWorksContent"

export const metadata: Metadata = {
  title: "How It Works | EquipVault Equipment Rental Marketplace",
  description:
    "Learn how renters book verified equipment with Stripe protection and how owners monetize idle gear on EquipVault.",
}

export default function HowItWorksPage() {
  return <HowItWorksContent />
}