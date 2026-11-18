"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Eye,
  EyeOff,
  Upload,
  Link2,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Wrench,
  UserCheck,
  Store,
} from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { uploadImageToImgBB } from "@/lib/imgbb"
import { SignUpFormValues, SignupRole } from "@/types"

function validatePassword(password: string): string | null {
  if (password.length < 6) {
    return "Password must be at least 6 characters long."
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter."
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter."
  }
  return null
}

export default function SignUpPage() {
  const router = useRouter()

  // Receive all form inputs in a single object including role
  const [formValues, setFormValues] = useState<SignUpFormValues>({
    name: "",
    email: "",
    password: "",
    photoUrl: "",
    role: "customer",
  })

  const [photoMode, setPhotoMode] = useState<"upload" | "url">("upload")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")

  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const passwordChecks = {
    minLength: formValues.password.length >= 6,
    hasUppercase: /[A-Z]/.test(formValues.password),
    hasLowercase: /[a-z]/.test(formValues.password),
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "password" && passwordError) {
      setPasswordError(null)
    }
  }

  const handleRoleSelect = (selectedRole: SignupRole) => {
    setFormValues((prev) => ({
      ...prev,
      role: selectedRole,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPG, PNG, WebP).")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be under 5MB.")
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPasswordError(null)

    const validationError = validatePassword(formValues.password)
    if (validationError) {
      setPasswordError(validationError)
      toast.error(validationError)
      return
    }

    if (photoMode === "upload" && !imageFile) {
      toast.error("Please select an image file or switch to Image URL.")
      return
    }
    if (photoMode === "url" && !formValues.photoUrl.trim()) {
      toast.error("Please provide a valid profile image URL.")
      return
    }

    try {
      setIsSubmitting(true)

      let resolvedImageUrl = formValues.photoUrl.trim()
      if (photoMode === "upload" && imageFile) {
        resolvedImageUrl = await uploadImageToImgBB(imageFile)
      }

      // Final user registration object
      const signUpPayload = {
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
        image: resolvedImageUrl,
        role: formValues.role,
      }

      const { error } = await authClient.signUp.email(signUpPayload)

      if (error) {
        toast.error(error.message || "Registration failed. Please try again.")
        return
      }

      toast.success(
        `Account created as ${formValues.role === "owner" ? "Equipment Owner" : "Customer"}!`
      )
      router.push("/")
      router.refresh()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong during registration."
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Google Social Sign Up (defaults to 'customer' role)
  const handleGoogleSignUp = async () => {
    try {
      setIsGoogleLoading(true)
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      })

      if (error) {
        toast.error(error.message || "Google sign-up failed.")
        setIsGoogleLoading(false)
      }
    } catch {
      toast.error("Unable to connect with Google right now.")
      setIsGoogleLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <span className="p-2 rounded-lg bg-primary text-primary-foreground">
              <Wrench className="w-5 h-5" />
            </span>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Equip<span className="text-primary">Vault</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Create an Account</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Join EquipVault to rent or list verified equipment
          </p>
        </div>

        {/* Google Social Sign Up Button */}
        <button
          type="button"
          onClick={handleGoogleSignUp}
          disabled={isGoogleLoading || isSubmitting}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-border bg-secondary/50 hover:bg-secondary text-foreground font-medium text-sm transition disabled:opacity-60 cursor-pointer"
        >
          {isGoogleLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
              />
            </svg>
          )}
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2.5 text-muted-foreground">
              Or register with email
            </span>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Account Role Selection (Customer vs Equipment Owner) */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              I want to join as
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRoleSelect("customer")}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition cursor-pointer ${
                  formValues.role === "customer"
                    ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                    : "border-border bg-background hover:bg-muted/40 text-muted-foreground"
                }`}
              >
                <UserCheck
                  className={`w-4 h-4 mb-1.5 ${
                    formValues.role === "customer" ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span className="text-sm font-semibold text-foreground">Customer</span>
                <span className="text-[11px] text-muted-foreground">Browse & rent gear</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect("owner")}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition cursor-pointer ${
                  formValues.role === "owner"
                    ? "border-primary bg-primary/10 text-foreground ring-1 ring-primary"
                    : "border-border bg-background hover:bg-muted/40 text-muted-foreground"
                }`}
              >
                <Store
                  className={`w-4 h-4 mb-1.5 ${
                    formValues.role === "owner" ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span className="text-sm font-semibold text-foreground">Owner</span>
                <span className="text-[11px] text-muted-foreground">List & earn from gear</span>
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formValues.name}
              onChange={handleInputChange}
              placeholder="e.g. Nader Ar Rahman"
              className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formValues.email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Profile Photo (ImgBB Upload or Direct Link) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-foreground">Profile Photo</label>
              <div className="inline-flex rounded-md border border-border p-0.5 bg-muted/50 text-xs">
                <button
                  type="button"
                  onClick={() => setPhotoMode("upload")}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded transition cursor-pointer ${
                    photoMode === "upload"
                      ? "bg-background text-foreground shadow-xs font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Upload className="w-3 h-3" /> Upload
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoMode("url")}
                  className={`inline-flex items-center gap-1 px-2 py-1 rounded transition cursor-pointer ${
                    photoMode === "url"
                      ? "bg-background text-foreground shadow-xs font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Link2 className="w-3 h-3" /> Image URL
                </button>
              </div>
            </div>

            {photoMode === "upload" ? (
              <div className="flex items-center gap-3">
                <label className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg border border-dashed border-input bg-background hover:bg-muted/40 text-sm text-muted-foreground cursor-pointer transition">
                  <Upload className="w-4 h-4 text-primary" />
                  <span className="truncate">
                    {imageFile ? imageFile.name : "Choose image file (ImgBB)"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    width={40}
                    height={40}
                    unoptimized
                    className="w-10 h-10 rounded-full object-cover border border-border shrink-0"
                  />
                )}
              </div>
            ) : (
              <input
                name="photoUrl"
                type="url"
                value={formValues.photoUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-3.5 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formValues.password}
                onChange={handleInputChange}
                placeholder="Create a strong password"
                className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {passwordError && (
              <p className="text-xs text-destructive font-medium mt-1.5">{passwordError}</p>
            )}

            {/* Password Requirement Checklist */}
            <ul className="mt-2.5 space-y-1 text-xs text-muted-foreground">
              <li className="flex items-center gap-1.5">
                {passwordChecks.minLength ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-muted-foreground/60" />
                )}
                <span>At least 6 characters</span>
              </li>
              <li className="flex items-center gap-1.5">
                {passwordChecks.hasUppercase ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-muted-foreground/60" />
                )}
                <span>At least one uppercase letter (A–Z)</span>
              </li>
              <li className="flex items-center gap-1.5">
                {passwordChecks.hasLowercase ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-muted-foreground/60" />
                )}
                <span>At least one lowercase letter (a–z)</span>
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || isGoogleLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-95 transition flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Login Page Redirect Link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-primary hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </main>
  )
}