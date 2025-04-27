"use client"

import { createContext, useContext } from "react"

export interface Font {
  family: string
  weights: number[]
  italics: number[]
  category: string
  hasLigature?: boolean
}

export type OS = "windows" | "mac"

export interface FontOptions {
  ligature: boolean
  os: OS
  size: number
  weight: number
  italic: boolean
  fallback: string
}

interface FontOptionsContextType {
  fontOptions: FontOptions
  setFontOptions: React.Dispatch<React.SetStateAction<FontOptions>>
}

export const FontOptionsContext = createContext<FontOptionsContextType | null>(
  null
)

export function useFontOptions() {
  const context = useContext(FontOptionsContext)
  if (!context) {
    throw new Error("useFontOptions must be used within a FontOptionsProvider")
  }
  return context
}
