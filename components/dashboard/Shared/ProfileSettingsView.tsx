"use client"

import React, { useState } from "react"
import Image from "next/image"
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Camera,
  Save,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  KeyRound,
} from "lucide-react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"

interface ProfileSettingsViewProps {
  fallbackRole?: "owner" | "customer" | "admin"
}

export default function ProfileSettingsView({
  fallbackRole = "owner",
}: ProfileSettingsViewProps) {
  const { data: session, isPending, refetch } = authClient.useSession()

  // Draft states (null means fall back directly to live session values)
  const [nameDraft, setNameDraft] = useState<string | null>(null)
  const [imageDraft, setImageDraft] = useState<string | null>(null)
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null)
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

  // Password Form States
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  if (isPending) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-pulse">
        <div className="lg:col-span-4 h-72 rounded-2xl bg-muted/50 border border-border" />
        <div className="lg:col-span-8 space-y-6">
          <div className="h-64 rounded-2xl bg-muted/50 border border-border" />
          <div className="h-64 rounded-2xl bg-muted/50 border border-border" />
        </div>
      </div>
    )
  }

  const user = session?.user
  const name = nameDraft !== null ? nameDraft : user?.name || ""
  const imageUrl = imageDraft !== null ? imageDraft : user?.image || ""
  const imgError = Boolean(imageUrl && failedImageUrl === imageUrl)

  const resolvedRole =
    user && "role" in user && typeof user.role === "string"
      ? user.role
      : fallbackRole

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Verified Member"

  const initials = (name || user?.name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedName = name.trim()
    const trimmedImage = imageUrl.trim()

    if (!trimmedName) {
      toast.error("Display name cannot be empty.")
      return
    }

    try {
      setIsUpdatingProfile(true)
      const { error } = await authClient.updateUser({
        name: trimmedName,
        image: trimmedImage || undefined,
      })

      if (error) {
        toast.error(error.message || "Failed to update profile.")
        return
      }

      await refetch()
      setNameDraft(null)
      setImageDraft(null)
      toast.success("Profile updated successfully!")
    } catch {
      toast.error("Something went wrong while updating profile.")
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.")
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.")
      return
    }

    if (currentPassword === newPassword) {
      toast.error("New password must be different from your current password.")
      return
    }

    try {
      setIsChangingPassword(true)
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      })

      if (error) {
        toast.error(
          error.message || "Current password is incorrect or update failed."
        )
        return
      }

      toast.success("Password changed successfully!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch {
      toast.error("Something went wrong while changing password.")
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Profile Identity Card (4 Cols) */}
      <div className="lg:col-span-4 bg-card border border-border rounded-2xl p-6 shadow-2xs space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative size-24 rounded-full overflow-hidden border-2 border-primary/30 bg-primary/10 flex items-center justify-center shadow-xs">
            {imageUrl && !imgError ? (
              <Image
                src={imageUrl}
                alt={name || "Profile Avatar"}
                fill
                unoptimized
                onError={() => setFailedImageUrl(imageUrl)}
                className="object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-primary">
                {initials}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <h2 className="text-lg font-bold text-foreground">
              {user?.name || "EquipVault User"}
            </h2>
            <p className="text-xs text-muted-foreground break-all">
              {user?.email}
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/25">
            <ShieldCheck className="size-3.5" />
            {resolvedRole} Account
          </span>
        </div>

        <div className="pt-5 border-t border-border space-y-3 text-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              Account Status
            </span>
            <span className="font-semibold text-emerald-500">Active</span>
          </div>

          <div className="flex items-center justify-between text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5 text-primary" />
              Member Since
            </span>
            <span className="font-medium text-foreground">{joinedDate}</span>
          </div>

          {user?.id && (
            <div className="pt-2 border-t border-border/60">
              <span className="text-[11px] text-muted-foreground block mb-1">
                Account ID
              </span>
              <code className="block text-[11px] font-mono bg-muted px-2.5 py-1.5 rounded-lg text-foreground truncate">
                {user.id}
              </code>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Edit Profile & Change Password Forms (8 Cols) */}
      <div className="lg:col-span-8 space-y-6">
        {/* Card 1: Personal Information */}
        <form
          onSubmit={handleProfileUpdate}
          className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xs space-y-5"
        >
          <div className="border-b border-border pb-4">
            <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
              <User className="size-4 text-primary" />
              Personal Information
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Update your public display name and profile avatar URL.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <User className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setNameDraft(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Email Address (Read-only)
              </label>
              <div className="relative">
                <Mail className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  disabled
                  value={user?.email || ""}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-input bg-muted/50 text-muted-foreground text-sm cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Profile Image URL */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Profile Photo URL
            </label>
            <div className="relative">
              <Camera className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageDraft(e.target.value)}
                placeholder="https://example.com/your-avatar.jpg"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              Paste a direct image link (ImgBB, Cloudinary, or Unsplash) for
              instant preview.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isUpdatingProfile}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition disabled:opacity-60 cursor-pointer"
            >
              {isUpdatingProfile ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save Profile Changes
                </>
              )}
            </button>
          </div>
        </form>

        {/* Card 2: Direct Password Change */}
        <form
          onSubmit={handlePasswordChange}
          className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xs space-y-5"
        >
          <div className="border-b border-border pb-4">
            <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
              <KeyRound className="size-4 text-primary" />
              Change Password
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Update your password directly using your current password.
            </p>
          </div>

          {/* Current Password */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">
              Current Password *
            </label>
            <div className="relative">
              <Lock className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showCurrentPw ? "text" : "password"}
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPw((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showCurrentPw ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                New Password (min. 8 characters) *
              </label>
              <div className="relative">
                <Lock className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showNewPw ? "text" : "password"}
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPw((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {showNewPw ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                Confirm New Password *
              </label>
              <div className="relative">
                <Lock className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPw ? "text" : "password"}
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  {showConfirmPw ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isChangingPassword}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-foreground text-background hover:opacity-90 text-sm font-semibold transition disabled:opacity-60 cursor-pointer"
            >
              {isChangingPassword ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Updating Password...
                </>
              ) : (
                <>
                  <Lock className="size-4" />
                  Update Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}