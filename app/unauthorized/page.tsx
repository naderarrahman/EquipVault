import Link from "next/link"
import { ShieldAlert, LayoutDashboard, Home } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center space-y-6 shadow-sm">
        <div className="size-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto border border-destructive/20">
          <ShieldAlert className="size-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-destructive/10 text-destructive">
            403 &bull; Access Denied
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Unauthorized Access
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You do not have permission to view this workspace. Please return to
            your authorized dashboard or homepage.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition"
          >
            <LayoutDashboard className="size-4" />
            Go to My Dashboard
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-background hover:bg-muted text-sm font-medium text-foreground transition"
          >
            <Home className="size-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}