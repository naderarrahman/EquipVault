"use client"

import React, { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Eye, EyeOff, Loader2, LogIn, Wrench } from "lucide-react"
import { authClient } from "@/lib/auth-client"
import { SignInFormValues } from "@/types"

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  // Receive email & password inputs in a single typed object
  const [formValues, setFormValues] = useState<SignInFormValues>({
    email: "",
    password: "",
  })

  // UI & loading states
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  // Single handler to update fields inside formValues object
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle Email & Password Sign In
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const signInPayload = {
      email: formValues.email.trim(),
      password: formValues.password,
    }

    try {
      setIsSubmitting(true)

      const { error } = await authClient.signIn.email(signInPayload)

      if (error) {
        toast.error(error.message || "Invalid email or password. Please try again.")
        return
      }

      toast.success("Welcome back! Signed in successfully.")
      router.push(callbackUrl)
      router.refresh()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong while signing in."
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle Google Social Sign In (defaults to 'customer' role for new users)
  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true)
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      })

      if (error) {
        toast.error(error.message || "Google sign-in failed.")
        setIsGoogleLoading(false)
      }
    } catch {
      toast.error("Unable to connect with Google right now.")
      setIsGoogleLoading(false)
    }
  }

  return (
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
        <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sign in to manage your rentals, equipment, and bookings
        </p>
      </div>

      {/* Google Social Sign In Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
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
            Or sign in with email
          </span>
        </div>
      </div>

      {/* Sign In Form */}
      <form onSubmit={handleSignIn} className="space-y-4">
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
              placeholder="Enter your password"
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
              Signing In...
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              Sign In
            </>
          )}
        </button>
      </form>

      {/* Register Page Redirect Link */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  )
}

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <Suspense
        fallback={
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            Loading Sign In...
          </div>
        }
      >
        <SignInForm />
      </Suspense>
    </main>
  )
}