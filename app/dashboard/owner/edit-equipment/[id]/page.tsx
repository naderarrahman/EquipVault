import Link from "next/link"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { getSingleEquipmentApi } from "@/lib/services/getApi"
import EditEquipmentForm from "@/components/dashboard/owner/EditEquipmentForm"

interface EditEquipmentPageProps {
  params: Promise<{ id: string }>
}

export default async function EditEquipmentPage({
  params,
}: EditEquipmentPageProps) {
  const { id } = await params
  const response = await getSingleEquipmentApi(id)

  if (!response.success || !response.data) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <div className="size-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
          <AlertCircle className="size-6" />
        </div>
        <h2 className="text-xl font-bold text-foreground">
          Equipment Not Found
        </h2>
        <p className="text-sm text-muted-foreground">
          {response.message || "Unable to load this equipment for editing."}
        </p>
        <Link
          href="/dashboard/owner/my-equipment"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
        >
          <ArrowLeft className="size-4" />
          Back to My Equipment
        </Link>
      </div>
    )
  }

  return <EditEquipmentForm equipment={response.data} />
}