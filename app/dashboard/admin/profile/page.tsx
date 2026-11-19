import ProfileSettingsView from "@/components/dashboard/Shared/ProfileSettingsView";

export default function AdminProfilePage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="border-b border-border pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Admin Profile &amp; Security
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your administrator account details, avatar, and password.
        </p>
      </div>

      <ProfileSettingsView fallbackRole="admin" />
    </div>
  )
}