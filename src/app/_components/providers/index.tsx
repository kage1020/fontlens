"use client"

import { ASCII } from "@/app/_components/const"
import {
  FontOptions,
  FontOptionsContext,
} from "@/app/_components/providers/font-options"
import { Mode, ModeContext } from "@/app/_components/providers/mode"
import { TextContext } from "@/app/_components/providers/text"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "next-themes"
import { useState } from "react"

export function OptionProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState(ASCII)
  const [fontOptions, setFontOptions] = useState<FontOptions>({
    ligature: false,
    os: "mac",
    size: 20,
    weight: 400,
    italic: false,
    fallback: "Tofu",
  })
  const [mode, setMode] = useState<Mode>("preview")

  return (
    <ThemeProvider attribute="class" storageKey="fontlens.theme">
      <TooltipProvider>
        <TextContext value={{ text, setText }}>
          <FontOptionsContext value={{ fontOptions, setFontOptions }}>
            <ModeContext value={{ mode, setMode }}>{children}</ModeContext>
          </FontOptionsContext>
        </TextContext>
      </TooltipProvider>
    </ThemeProvider>
  )
}
