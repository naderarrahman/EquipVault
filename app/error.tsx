"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, Home, RotateCcw } from "lucide-react"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Application Error Boundary:", error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-background">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center shadow-2xs space-y-6">
        <div className="size-16 rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 flex items-center justify-center mx-auto">
          <AlertTriangle className="size-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-muted text-muted-foreground">
            Unexpected Error
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Something Went Wrong
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We encountered an unexpected issue while loading this page. You can
            try reloading the view or return to the homepage.
          </p>
        </div>

        {error?.digest && (
          <div className="p-2.5 rounded-xl bg-muted/50 border border-border">
            <p className="text-[11px] font-mono text-muted-foreground">
              Error Reference: <span className="text-foreground">{error.digest}</span>
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition cursor-pointer"
          >
            <RotateCcw className="size-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-sm font-semibold text-foreground transition"
          >
            <Home className="size-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}