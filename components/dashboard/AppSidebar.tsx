"use client"

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  LayoutDashboard,
  CalendarCheck,
  Heart,
  UserCircle,
  PlusCircle,
  Package,
  ClipboardList,
  Users,
  ShieldCheck,
  BarChart3,
  Wrench,
  Home,
  LogOut,
  Compass,
  type LucideIcon,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import type { UserRole } from "@/types"

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

const roleNavigationMap: Record<UserRole, { label: string; items: NavItem[] }> = {
  customer: {
    label: "Customer Workspace",
    items: [
      { title: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
      { title: "My Bookings", href: "/dashboard/customer/bookings", icon: CalendarCheck },
      { title: "Saved Favorites", href: "/dashboard/customer/favorites", icon: Heart },
      { title: "My Profile", href: "/dashboard/customer/profile", icon: UserCircle },
    ],
  },
  owner: {
    label: "Owner Operations",
    items: [
      { title: "Owner Overview", href: "/dashboard/owner", icon: BarChart3 },
      { title: "Add Equipment", href: "/dashboard/owner/add-equipment", icon: PlusCircle },
      { title: "My Equipment", href: "/dashboard/owner/my-equipment", icon: Package },
      { title: "Rental Requests", href: "/dashboard/owner/bookings", icon: ClipboardList },
      { title: "My Profile", href: "/dashboard/owner/profile", icon: UserCircle },
    ],
  },
  admin: {
    label: "Admin Control",
    items: [
      { title: "Platform Analytics", href: "/dashboard/admin", icon: BarChart3 },
      { title: "Manage Users", href: "/dashboard/admin/users", icon: Users },
      { title: "Equipment Approvals", href: "/dashboard/admin/equipment", icon: ShieldCheck },
      { title: "All Bookings", href: "/dashboard/admin/bookings", icon: CalendarCheck },
      { title: "My Profile", href: "/dashboard/admin/profile", icon: UserCircle },
    ],
  },
}

interface AppSidebarProps {
  role: UserRole
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function AppSidebar({ role, user }: AppSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const currentMenu = roleNavigationMap[role] || roleNavigationMap.customer
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U"

  const handleLogout = async () => {
    try {
      await authClient.signOut()
      toast.success("Logged out successfully.")
      router.push("/")
      router.refresh()
    } catch {
      toast.error("Failed to log out.")
    }
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-border/80 bg-card">
      {/* Brand Header */}
      <SidebarHeader className="h-16 justify-center border-b border-border/80 px-2.5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="EquipVault Home"
              onClick={() => router.push("/")}
              className="cursor-pointer hover:bg-muted/70"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-2xs">
                <Wrench className="size-4" />
              </div>
              <div className="flex flex-col text-left leading-tight group-data-[collapsible=icon]:hidden">
                <span className="font-heading font-bold tracking-tight text-base text-foreground">
                  Equip<span className="text-primary">Vault</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  {role} portal
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Navigation */}
      <SidebarContent className="px-2 py-4 gap-4">
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/75">
            {currentMenu.label}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {currentMenu.items.map((item) => {
                const isRootRoleRoute =
                  item.href === "/dashboard/user" ||
                  item.href === "/dashboard/owner" ||
                  item.href === "/dashboard/admin"

                const isActive = isRootRoleRoute
                  ? pathname === item.href
                  : pathname.startsWith(item.href)

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      onClick={() => router.push(item.href)}
                      className={`h-10 rounded-lg px-3 cursor-pointer transition-all ${
                        isActive
                          ? "bg-primary/12 text-primary font-semibold border border-primary/20 hover:bg-primary/15 hover:text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                      }`}
                    >
                      <item.icon
                        className={`size-4 shrink-0 ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span className="truncate text-sm">{item.title}</span>
                      {isActive && (
                        <span className="ml-auto size-1.5 rounded-full bg-primary group-data-[collapsible=icon]:hidden" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-2 opacity-60" />

        {/* Quick Site Links */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/75">
            Explore Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Back to Homepage"
                  onClick={() => router.push("/")}
                  className="h-9 rounded-lg px-3 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted/70"
                >
                  <Home className="size-4 shrink-0" />
                  <span className="truncate text-sm">Back to Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Browse Equipment"
                  onClick={() => router.push("/equipment")}
                  className="h-9 rounded-lg px-3 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted/70"
                >
                  <Compass className="size-4 shrink-0" />
                  <span className="truncate text-sm">Browse Catalog</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bottom User Profile Card */}
      <SidebarFooter className="border-t border-border/80 p-3">
        <div className="flex items-center gap-2.5 rounded-xl border border-border/80 bg-muted/40 p-2 group-data-[collapsible=icon]:border-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={36}
              height={36}
              unoptimized
              className="size-8 rounded-lg object-cover border border-border shrink-0"
            />
          ) : (
            <span className="size-8 rounded-lg bg-primary/15 text-primary font-bold text-xs flex items-center justify-center shrink-0">
              {userInitial}
            </span>
          )}

          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
            <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            aria-label="Logout"
            className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition shrink-0 group-data-[collapsible=icon]:hidden cursor-pointer"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}