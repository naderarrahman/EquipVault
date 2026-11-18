import { Suspense } from "react"
import { Package, AlertCircle } from "lucide-react"
import { getAllEquipmentApi } from "@/lib/services/getApi"
import EquipmentCard from "@/components/ProductCard/EquipmentCard"
import EquipmentFilterBar from "@/components/ProductCard/EquipmentFilterBar"
import type {
  ApiResponse,
  Equipment,
  EquipmentAvailabilityFilter,
  EquipmentFilterParams,
  EquipmentSortOption,
} from "@/types"

interface AllEquipmentPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const getSingleParam = (
  value: string | string[] | undefined
): string | undefined => {
  if (Array.isArray(value)) return value[0]
  return value
}

export default async function AllEquipmentPage({
  searchParams,
}: AllEquipmentPageProps) {
  const resolvedParams = await searchParams

  const availabilityParam = getSingleParam(resolvedParams.availability)
  const validAvailability: EquipmentAvailabilityFilter =
    availabilityParam === "available" || availabilityParam === "unavailable"
      ? availabilityParam
      : "all"

  const sortParam = getSingleParam(resolvedParams.sort)
  const validSort: EquipmentSortOption =
    sortParam === "price-asc" || sortParam === "price-desc"
      ? sortParam
      : "recent"

  const filterParams: EquipmentFilterParams = {
    search: getSingleParam(resolvedParams.search),
    category: getSingleParam(resolvedParams.category),
    rentalType: getSingleParam(resolvedParams.rentalType),
    minPrice: getSingleParam(resolvedParams.minPrice),
    maxPrice: getSingleParam(resolvedParams.maxPrice),
    availability: validAvailability,
    sort: validSort,
  }

  let equipments: Equipment[] = []
  let errorMessage: string | null = null

  try {
    const response: ApiResponse<Equipment[]> =
      await getAllEquipmentApi(filterParams)
    if (response.success) {
      equipments = response.data ?? []
    } else {
      errorMessage = response.message || "Failed to load equipment marketplace."
    }
  } catch (error) {
    console.error("Error fetching all equipment:", error)
    errorMessage = "Something went wrong while connecting to the server."
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Equipment Marketplace
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Browse verified machinery, electronics, and vehicles available for
            rent.
          </p>
        </div>

        <p className="text-xs font-mono text-muted-foreground bg-muted px-3 py-1.5 rounded-lg self-start sm:self-auto">
          Showing <strong className="text-foreground">{equipments.length}</strong>{" "}
          {equipments.length === 1 ? "item" : "items"}
        </p>
      </div>

      {/* Search, Filter & Sort Controls */}
      <Suspense
        fallback={
          <div className="h-32 rounded-2xl bg-muted/40 animate-pulse border border-border" />
        }
      >
        <EquipmentFilterBar />
      </Suspense>

      {/* Error State */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Empty State */}
      {!errorMessage && equipments.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-2xl p-8 space-y-3 shadow-2xs">
          <div className="size-14 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <Package className="size-7" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            No matching equipment found
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Try adjusting your search keywords, price range, or filters to see
            more available listings.
          </p>
        </div>
      ) : (
        /* Equipment Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipments.map((item) => (
            <EquipmentCard key={item._id} item={item} showStatus={false} />
          ))}
        </div>
      )}
    </div>
  )
}