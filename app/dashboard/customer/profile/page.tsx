import ProfileSettingsView from "@/components/dashboard/Shared/ProfileSettingsView";

export default function CustomerProfilePage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="border-b border-border pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Account &amp; Profile Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your renter profile details, avatar, and account password.
        </p>
      </div>

      <ProfileSettingsView fallbackRole="customer" />
    </div>
  )
}