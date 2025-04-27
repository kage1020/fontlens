"use client"

import { createContext, useContext } from "react"

interface TextContextType {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
}

export const TextContext = createContext<TextContextType | null>(null)

export function useText() {
  const context = useContext(TextContext)
  if (!context) {
    throw new Error("useText must be used within a TextProvider")
  }
  return context
}
