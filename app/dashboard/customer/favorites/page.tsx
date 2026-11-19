import Link from "next/link"
import { Heart, Compass, AlertCircle } from "lucide-react"
import { getMyFavoritesApi } from "@/lib/services/getApi"
import EquipmentCard from "@/components/ProductCard/EquipmentCard"
import type { ApiResponse, Equipment } from "@/types"

export default async function CustomerFavoritesPage() {
  let favorites: Equipment[] = []
  let errorMessage: string | null = null

  try {
    const response: ApiResponse<Equipment[]> = await getMyFavoritesApi()
    if (response.success) {
      favorites = response.data ?? []
    } else {
      errorMessage = response.message || "Failed to load saved favorites."
    }
  } catch (error) {
    console.error("Error fetching favorites:", error)
    errorMessage = "Something went wrong while connecting to the server."
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Saved Equipment &amp; Favorites
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Quickly access equipment you bookmarked for upcoming projects and
            rentals.
          </p>
        </div>

        <Link
          href="/equipment"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition shadow-xs"
        >
          <Compass className="size-4" />
          Browse Marketplace
        </Link>
      </div>

      {/* Error State */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Empty State */}
      {!errorMessage && favorites.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-2xl p-8 space-y-4 shadow-2xs">
          <div className="size-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="size-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">
              No saved favorites yet
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Explore the equipment marketplace and click the Favorite button on
              any item to save it here for quick booking later.
            </p>
          </div>
          <Link
            href="/equipment"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium transition hover:bg-primary/90"
          >
            <Compass className="size-4" /> Explore Equipment
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <EquipmentCard
              key={item._id}
              item={item}
              showStatus={false}
              showUnfavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}