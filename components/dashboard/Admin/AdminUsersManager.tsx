"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  AlertTriangle,
  Loader2,
  Mail,
  Search,
  Shield,
  Store,
  Trash2,
  UserCheck,
  Users,
  X,
} from "lucide-react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import {
  deleteUserAction,
  updateUserRoleAction,
} from "@/actions/admin.actions"
import type { AdminUserRecord, UserRole } from "@/types"

interface AdminUsersManagerProps {
  initialUsers: AdminUserRecord[]
}

const roleTabs: Array<{ label: string; value: "all" | UserRole }> = [
  { label: "All Users", value: "all" },
  { label: "Customers", value: "customer" },
  { label: "Owners", value: "owner" },
  { label: "Admins", value: "admin" },
]

const getResolvedUserId = (user: AdminUserRecord): string => {
  if (typeof user._id === "string" && user._id) return user._id
  if (typeof user.id === "string" && user.id) return user.id
  return ""
}

export default function AdminUsersManager({
  initialUsers,
}: AdminUsersManagerProps) {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const currentAdminId = session?.user?.id || ""

  const [users, setUsers] = useState<AdminUserRecord[]>(initialUsers)
  const [activeTab, setActiveTab] = useState<"all" | UserRole>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [updatingRoleId, setUpdatingRoleId] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<AdminUserRecord | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const stats = useMemo(() => {
    const total = users.length
    const customers = users.filter(
      (u) => (u.role || "customer") === "customer"
    ).length
    const owners = users.filter((u) => u.role === "owner").length
    const admins = users.filter((u) => u.role === "admin").length

    return { total, customers, owners, admins }
  }, [users])

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const role = user.role || "customer"
      const matchesTab = activeTab === "all" || role === activeTab

      const keyword = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !keyword ||
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)

      return matchesTab && matchesSearch
    })
  }, [users, activeTab, searchQuery])

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    if (!userId) return

    try {
      setUpdatingRoleId(userId)
      const res = await updateUserRoleAction(userId, newRole)

      if (!res.success) {
        toast.error(res.message || "Failed to update user role.")
        return
      }

      setUsers((prev) =>
        prev.map((item) =>
          getResolvedUserId(item) === userId ? { ...item, role: newRole } : item
        )
      )

      toast.success(`User role updated to ${newRole}.`)
      router.refresh()
    } catch {
      toast.error("Something went wrong while updating role.")
    } finally {
      setUpdatingRoleId(null)
    }
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    const targetId = getResolvedUserId(deleteTarget)
    if (!targetId) return

    try {
      setIsDeleting(true)
      const res = await deleteUserAction(targetId)

      if (!res.success) {
        toast.error(res.message || "Failed to delete user.")
        return
      }

      setUsers((prev) =>
        prev.filter((item) => getResolvedUserId(item) !== targetId)
      )

      toast.success("User account deleted.")
      setDeleteTarget(null)
      router.refresh()
    } catch {
      toast.error("Something went wrong while deleting user.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Total Users
            </p>
            <p className="text-2xl font-bold text-foreground font-mono mt-1">
              {stats.total}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Users className="size-5" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Customers
            </p>
            <p className="text-2xl font-bold text-foreground font-mono mt-1">
              {stats.customers}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <UserCheck className="size-5" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Equipment Owners
            </p>
            <p className="text-2xl font-bold text-emerald-500 font-mono mt-1">
              {stats.owners}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Store className="size-5" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-medium">
              Administrators
            </p>
            <p className="text-2xl font-bold text-amber-500 font-mono mt-1">
              {stats.admins}
            </p>
          </div>
          <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Shield className="size-5" />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {roleTabs.map((tab) => {
            const isActive = activeTab === tab.value
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <Search className="size-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-input bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl p-8 space-y-3 shadow-2xs">
          <div className="size-14 rounded-2xl bg-muted flex items-center justify-center mx-auto text-muted-foreground">
            <Users className="size-7" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            No users found
          </h3>
          <p className="text-sm text-muted-foreground">
            No registered users match your selected role filter or search.
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <th className="py-3.5 px-5">User</th>
                  <th className="py-3.5 px-5">Current Role</th>
                  <th className="py-3.5 px-5">Joined</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                {filteredUsers.map((user) => {
                  const userId = getResolvedUserId(user)
                  const role: UserRole = user.role || "customer"
                  const isSelf = Boolean(currentAdminId && userId === currentAdminId)
                  const isUpdating = updatingRoleId === userId

                  const joinedDate = user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "—"

                  return (
                    <tr
                      key={userId || user.email}
                      className="hover:bg-muted/20 transition"
                    >
                      {/* User Info */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative size-10 rounded-full overflow-hidden bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0 border border-border">
                            {user.image ? (
                              <Image
                                src={user.image}
                                alt={user.name}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            ) : (
                              <span>
                                {(user.name || "U").slice(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground truncate flex items-center gap-2">
                              <span>{user.name}</span>
                              {isSelf && (
                                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold">
                                  YOU
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 truncate">
                              <Mail className="size-3 shrink-0" />
                              <span>{user.email}</span>
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-4 px-5">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                            role === "admin"
                              ? "bg-amber-500/15 text-amber-500 border-amber-500/30"
                              : role === "owner"
                              ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
                              : "bg-blue-500/15 text-blue-500 border-blue-500/30"
                          }`}
                        >
                          {role}
                        </span>
                      </td>

                      {/* Joined Date */}
                      <td className="py-4 px-5 text-xs text-muted-foreground font-mono">
                        {joinedDate}
                      </td>

                      {/* Role Switcher & Delete */}
                      <td className="py-4 px-5">
                        <div className="flex items-center justify-end gap-2">
                          {isUpdating && (
                            <Loader2 className="size-4 animate-spin text-primary" />
                          )}

                          <select
                            aria-label={`Change role for ${user.name}`}
                            disabled={isSelf || isUpdating}
                            value={role}
                            onChange={(e) =>
                              handleRoleChange(
                                userId,
                                e.target.value as UserRole
                              )
                            }
                            className="px-3 py-1.5 rounded-xl border border-input bg-background text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <option value="customer">Customer</option>
                            <option value="owner">Owner</option>
                            <option value="admin">Admin</option>
                          </select>

                          <button
                            type="button"
                            disabled={isSelf}
                            onClick={() => setDeleteTarget(user)}
                            title={
                              isSelf
                                ? "Cannot delete your own account"
                                : "Delete User"
                            }
                            className="p-2 rounded-xl border border-border bg-background hover:bg-destructive/10 hover:border-destructive/30 text-muted-foreground hover:text-destructive transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-xl space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                  <AlertTriangle className="size-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    Delete User Account?
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    This action permanently removes the user record.
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to delete{" "}
              <strong className="text-foreground">{deleteTarget.name}</strong> (
              {deleteTarget.email})?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted text-xs sm:text-sm font-medium text-foreground transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
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
    </div>
  )
}