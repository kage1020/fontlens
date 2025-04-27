'use server'

import { DefaultFonts } from "@/app/_components/const"
import { Font } from "@/app/_components/providers/font-options"

function transformFont(item: GoogleFont): Font {
  const family = item.family.replace(/_/g, " ")
  const variants = item.variants.map(v => v.replace("regular", "400").replace("italic", "400italic"))
  const weights = variants.filter(v => !v.includes("italic")).map(v => parseInt(v)).filter(Boolean).toSorted((a, b) => a - b)
  const italics = variants.filter(v => v.includes("italic")).map(v => parseInt(v.replace("italic", ""))).filter(Boolean).toSorted((a, b) => a - b)

  return { family, weights, italics, category: item.category }
}

interface GoogleFont {
  family: string
  variants: string[]
  category: string
}

interface GoogleFontResponse {
  items: GoogleFont[]
}

export async function getGoogleFonts(query: string) {
  const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_API_KEY}&sort=popularity`)
  if (!response.ok) {
    throw new Error("Failed to fetch Google Fonts")
  }
  const data: GoogleFontResponse = await response.json()
  if (!data.items || data.items.length === 0) {
    return DefaultFonts
  }

  return data.items.map(v => transformFont(v)).filter((font) => {
    return font.family.toLowerCase().includes(query.toLowerCase())
  }).slice(0, 10)
}
