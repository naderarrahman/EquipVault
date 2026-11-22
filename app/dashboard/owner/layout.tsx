import React from "react"
import { requireRole } from "@/lib/auth-guard"

export default async function OwnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireRole("owner")

  return <>{children}</>
}