"use client"

import React, { useState, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal, RotateCcw, ArrowUpDown } from "lucide-react"
import type {
  EquipmentAvailabilityFilter,
  EquipmentCategory,
  EquipmentSortOption,
  RentalType,
} from "@/types"

const categories: Array<"All" | EquipmentCategory> = [
  "All",
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Electronics",
  "Event Equipment",
]

const rentalTypes: Array<"All" | RentalType> = [
  "All",
  "Daily",
  "Weekly",
  "Monthly",
]

interface FilterFormInnerProps {
  initialSearch: string
  initialCategory: string
  initialRentalType: string
  initialMinPrice: string
  initialMaxPrice: string
  initialAvailability: EquipmentAvailabilityFilter
  initialSort: EquipmentSortOption
  hasActiveFilters: boolean
  isPending: boolean
  onUpdateQuery: (updates: Record<string, string>) => void
  onResetAll: () => void
}

function FilterFormInner({
  initialSearch,
  initialCategory,
  initialRentalType,
  initialMinPrice,
  initialMaxPrice,
  initialAvailability,
  initialSort,
  hasActiveFilters,
  isPending,
  onUpdateQuery,
  onResetAll,
}: FilterFormInnerProps) {
  const [search, setSearch] = useState(initialSearch)
  const [minPrice, setMinPrice] = useState(initialMinPrice)
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice)

  const handleSearchAndPriceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onUpdateQuery({
      search,
      minPrice,
      maxPrice,
    })
  }

  return (
    <form
      onSubmit={handleSearchAndPriceSubmit}
      className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4"
    >
      {/* Top Row: Search Bar & Sorting */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by equipment name or location (e.g. Excavator, Dhaka)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-52">
            <ArrowUpDown className="size-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              aria-label="Sort equipment"
              value={initialSort}
              onChange={(e) => onUpdateQuery({ sort: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="recent">Recently Added</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition shrink-0 disabled:opacity-60 cursor-pointer"
          >
            {isPending ? "Filtering..." : "Search"}
          </button>
        </div>
      </div>

      {/* Bottom Row: Category, Rental Type, Availability, Price Range & Reset */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-3 border-t border-border">
        {/* Category */}
        <div>
          <label className="block text-[11px] font-medium text-muted-foreground mb-1">
            Category
          </label>
          <select
            value={initialCategory}
            onChange={(e) => onUpdateQuery({ category: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Rental Type */}
        <div>
          <label className="block text-[11px] font-medium text-muted-foreground mb-1">
            Rental Type
          </label>
          <select
            value={initialRentalType}
            onChange={(e) => onUpdateQuery({ rentalType: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {rentalTypes.map((type) => (
              <option key={type} value={type}>
                {type === "All" ? "All Billing Cycles" : type}
              </option>
            ))}
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-[11px] font-medium text-muted-foreground mb-1">
            Availability
          </label>
          <select
            value={initialAvailability}
            onChange={(e) => onUpdateQuery({ availability: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Stock Status</option>
            <option value="available">In Stock (Available)</option>
            <option value="unavailable">Out of Stock</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-[11px] font-medium text-muted-foreground mb-1">
            Price Range ($)
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min="0"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl border border-input bg-background text-foreground font-mono text-xs focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <span className="text-muted-foreground text-xs">-</span>
            <input
              type="number"
              min="0"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-2.5 py-2 rounded-xl border border-input bg-background text-foreground font-mono text-xs focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Apply Price & Reset Actions */}
        <div className="flex items-end gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-muted/60 hover:bg-muted text-foreground text-xs font-medium transition cursor-pointer"
          >
            <SlidersHorizontal className="size-3.5" />
            Apply Price
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetAll}
              title="Reset all filters"
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 text-xs font-medium transition cursor-pointer"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default function EquipmentFilterBar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentSearch = searchParams.get("search") ?? ""
  const currentCategory = searchParams.get("category") ?? "All"
  const currentRentalType = searchParams.get("rentalType") ?? "All"
  const currentMinPrice = searchParams.get("minPrice") ?? ""
  const currentMaxPrice = searchParams.get("maxPrice") ?? ""
  const currentAvailability =
    (searchParams.get("availability") as EquipmentAvailabilityFilter) ?? "all"
  const currentSort =
    (searchParams.get("sort") as EquipmentSortOption) ?? "recent"

  const hasActiveFilters = Boolean(
    currentSearch ||
      currentCategory !== "All" ||
      currentRentalType !== "All" ||
      currentMinPrice ||
      currentMaxPrice ||
      currentAvailability !== "all" ||
      currentSort !== "recent"
  )

  const handleUpdateQuery = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, rawValue]) => {
      const value = rawValue.trim()
      const isDefault =
        !value ||
        (key === "category" && value === "All") ||
        (key === "rentalType" && value === "All") ||
        (key === "availability" && value === "all") ||
        (key === "sort" && value === "recent")

      if (isDefault) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })

    const queryString = params.toString()
    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      })
    })
  }

  const handleResetAll = () => {
    startTransition(() => {
      router.replace(pathname, { scroll: false })
    })
  }

  return (
    <FilterFormInner
      key={searchParams.toString()}
      initialSearch={currentSearch}
      initialCategory={currentCategory}
      initialRentalType={currentRentalType}
      initialMinPrice={currentMinPrice}
      initialMaxPrice={currentMaxPrice}
      initialAvailability={currentAvailability}
      initialSort={currentSort}
      hasActiveFilters={hasActiveFilters}
      isPending={isPending}
      onUpdateQuery={handleUpdateQuery}
      onResetAll={handleResetAll}
    />
  )
}