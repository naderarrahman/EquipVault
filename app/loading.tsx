import { Loader2, Package } from "lucide-react"

export default function GlobalLoading() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center gap-4 px-4 bg-background">
      <div className="relative size-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
        <Package className="size-6" />
        <Loader2 className="size-14 animate-spin text-primary/40 absolute inset-0" />
      </div>

      <div className="text-center space-y-1">
        <p className="text-sm font-semibold text-foreground">
          Loading EquipVault
        </p>
        <p className="text-xs text-muted-foreground animate-pulse">
          Preparing machinery listings and workspace data...
        </p>
      </div>
    </div>
  )
}