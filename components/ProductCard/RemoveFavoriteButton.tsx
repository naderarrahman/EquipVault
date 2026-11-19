"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { HeartOff, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { toggleFavoriteAction } from "@/actions/equipment.actions"

interface RemoveFavoriteButtonProps {
  equipmentId: string
  equipmentName: string
}

export default function RemoveFavoriteButton({
  equipmentId,
  equipmentName,
}: RemoveFavoriteButtonProps) {
  const router = useRouter()
  const [isRemoving, setIsRemoving] = useState(false)

  const handleRemove = async () => {
    try {
      setIsRemoving(true)
      const res = await toggleFavoriteAction(equipmentId)

      if (!res.success) {
        toast.error(res.message || "Failed to remove from favorites.")
        return
      }

      toast.success(`Removed "${equipmentName}" from favorites.`)
      router.refresh()
    } catch {
      toast.error("Something went wrong while updating favorites.")
    } finally {
      setIsRemoving(false)
    }
  }

  return (
    <button
      type="button"
      disabled={isRemoving}
      onClick={handleRemove}
      title="Remove from Favorites"
      className="p-2 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition disabled:opacity-60 cursor-pointer"
    >
      {isRemoving ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <HeartOff className="size-4" />
      )}
    </button>
  )
}