"use client"

import { createContext, useContext } from "react"

export type Mode = "preview" | "editor"

interface ModeContextType {
  mode: Mode
  setMode: React.Dispatch<React.SetStateAction<Mode>>
}

export const ModeContext = createContext<ModeContextType | null>(null)

export function useMode() {
  const context = useContext(ModeContext)
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider")
  }
  return context
}
