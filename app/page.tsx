export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent text-accent-foreground mb-4">
        EQUIPVAULT DESIGN SYSTEM READY
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
        Rent Heavy & Pro Gear <span className="text-primary">Effortlessly</span>
      </h1>
      <p className="max-w-xl text-muted-foreground mb-6">
        Typography, high-contrast slate palette, and theme provider are configured cleanly.
      </p>
      <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
        Explore Equipment
      </button>
    </main>
  )
}