import type { ReactNode } from "react"
import AuthRouteGuard from "@/components/auth/AuthRouteGuard"

export default function AuthGroupLayout({
  children,
}: {
  children: ReactNode
}) {
  return <AuthRouteGuard>{children}</AuthRouteGuard>
}