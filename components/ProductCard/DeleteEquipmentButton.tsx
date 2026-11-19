"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2, Loader2, AlertTriangle, X } from "lucide-react"
import { toast } from "sonner"
import { deleteEquipmentAction } from "@/actions/equipment.actions"

interface DeleteEquipmentButtonProps {
  equipmentId: string
  equipmentName: string
}

export default function DeleteEquipmentButton({
  equipmentId,
  equipmentName,
}: DeleteEquipmentButtonProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const res = await deleteEquipmentAction(equipmentId)

      if (!res.success) {
        toast.error(res.message || "Failed to delete equipment.")
        return
      }

      toast.success("Equipment deleted successfully.")
      setIsOpen(false)
      router.refresh()
    } catch {
      toast.error("Something went wrong while deleting.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        title="Delete Listing"
        className="p-2 rounded-xl border border-border bg-background hover:bg-destructive/10 hover:border-destructive/30 text-muted-foreground hover:text-destructive transition cursor-pointer"
      >
        <Trash2 className="size-4" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-xl space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                  <AlertTriangle className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Delete Equipment?
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to permanently remove{" "}
              <strong className="text-foreground">{equipmentName}</strong> from
              your inventory?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted text-xs sm:text-sm font-medium text-foreground transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs sm:text-sm font-semibold hover:bg-destructive/90 transition disabled:opacity-60 cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" />
                    Confirm Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}