import React from "react"
import { requireRole } from "@/lib/auth-guard"

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireRole("customer")

  return <>{children}</>
}