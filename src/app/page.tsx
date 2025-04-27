import { FontPreview } from "@/app/_components/preview"
import { getGoogleFonts } from "@/app/actions"
import { unstable_cache } from "next/cache"
import { z } from "zod"

export const runtime = "edge"

const searchParamsSchema = z
  .object({
    query: z.string().optional(),
  })
  .catch(() => ({ query: "" }))

interface HomeProps {
  searchParams: Promise<z.infer<typeof searchParamsSchema>>
}

export default async function Home({ searchParams }: HomeProps) {
  const { query } = searchParamsSchema.parse(await searchParams)
  const fontsPromise = unstable_cache(getGoogleFonts, [query ?? ""])(
    query ?? ""
  )

  return (
    <main className="p-4 max-w-5xl mx-auto w-full">
      <FontPreview fontsPromise={fontsPromise} />
    </main>
  )
}
