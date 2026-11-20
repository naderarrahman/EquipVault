"use client"

import { useEffect } from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, Loader2, ShieldAlert } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import EquipmentDetailsActions from "@/components/ProductCard/EquipmentDetailsActions"
import type { Equipment } from "@/types"

export function EquipmentPrivateRouteGuard({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/sign-in")
    }
  }, [isPending, session, router])

  if (isPending || !session?.user) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="size-7 animate-spin text-primary" />
        <p className="text-sm font-medium">
          Verifying session to view equipment details...
        </p>
      </div>
    )
  }

  return <>{children}</>
}

interface RoleAwareEquipmentActionsProps {
  equipment: Equipment
  initialIsFavorite: boolean
}

export function RoleAwareEquipmentActions({
  equipment,
  initialIsFavorite,
}: RoleAwareEquipmentActionsProps) {
  const { data: session } = authClient.useSession()

  const role =
    session?.user &&
    "role" in session.user &&
    typeof session.user.role === "string"
      ? session.user.role
      : "customer"

  if (role === "admin") {
    return (
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2.5">
        <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <ShieldAlert className="size-4 text-primary shrink-0" />
          Admin Moderation View
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Booking and favorite actions are disabled for administrator accounts.
        </p>
        <Link
          href="/dashboard/admin/equipment"
          className="inline-flex items-center justify-center w-full h-10 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition"
        >
          Manage in Admin Dashboard
        </Link>
      </div>
    )
  }

  if (role === "owner") {
    return (
      <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-2.5">
        <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
          <Building2 className="size-4 text-primary shrink-0" />
          Equipment Owner Account
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Owner accounts cannot book or save marketplace items. Sign in with a
          Customer account to place a rental booking.
        </p>
        <Link
          href="/dashboard/owner"
          className="inline-flex items-center justify-center w-full h-10 px-4 rounded-xl border border-border bg-background hover:bg-muted text-xs font-semibold text-foreground transition"
        >
          Go to Owner Dashboard
        </Link>
      </div>
    )
  }

  return (
    <EquipmentDetailsActions
      equipment={equipment}
      initialIsFavorite={initialIsFavorite}
    />
  )
}