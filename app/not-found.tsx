import Link from "next/link"
import { ArrowRight, Compass, Home, LayoutDashboard, Wrench } from "lucide-react"

export default function GlobalNotFoundPage() {
  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-16 bg-background">
      <div className="max-w-lg w-full bg-card border border-border rounded-2xl p-8 sm:p-10 text-center space-y-6 shadow-sm">
        {/* Icon Badge */}
        <div className="relative mx-auto size-16 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
          <Wrench className="size-8" />
          <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-destructive text-destructive-foreground shadow-2xs">
            404
          </span>
        </div>

        {/* Heading & Description */}
        <div className="space-y-2">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            Route Not Found
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Equipment or Page Missing
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            The machinery listing or page you requested could not be found. It
            may have been removed, renamed, or the URL might be incorrect.
          </p>
        </div>

        {/* Balanced Action Buttons */}
        <div className="pt-2 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold whitespace-nowrap hover:bg-primary/90 active:scale-[0.99] transition shadow-xs"
            >
              <Home className="size-4 shrink-0" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/equipment"
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-border bg-background hover:bg-muted/80 text-sm font-semibold text-foreground whitespace-nowrap active:scale-[0.99] transition"
            >
              <Compass className="size-4 shrink-0 text-primary" />
              <span>Browse Equipment</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-border/60">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 w-full h-10 px-4 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 whitespace-nowrap transition group"
            >
              <LayoutDashboard className="size-3.5 shrink-0 text-primary" />
              <span>Go to My Dashboard</span>
              <ArrowRight className="size-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}