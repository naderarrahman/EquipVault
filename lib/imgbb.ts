
export async function uploadImageToImgBB(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY

  if (!apiKey) {
    throw new Error("ImgBB API key is missing in environment configuration.")
  }

  const formData = new FormData()
  formData.append("image", file)

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  })

  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(result?.error?.message || "Image upload failed. Please try again.")
  }

  return result.data.display_url
}