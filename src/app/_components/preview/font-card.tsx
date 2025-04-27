"use client"

import { Font, useFontOptions } from "@/app/_components/providers/font-options"
import { useMode } from "@/app/_components/providers/mode"
import { useText } from "@/app/_components/providers/text"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, Trash2 } from "lucide-react"
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"

const supportedCharsCache = new Map<string, Map<string, boolean>>()

// function isSupportedChar(font: Font, char: string) {
//   if (char === " " || typeof document === "undefined") return true

//   if (/^[a-zA-Z0-9]$/.test(char)) return true

//   const fontCache = supportedCharsCache.get(font.family)
//   if (fontCache && fontCache.has(char)) {
//     return fontCache.get(char) as boolean
//   }

//   const span = document.createElement("span")
//   span.style.fontFamily = `"${font.family}", Tofu`
//   span.style.fontSize = "1024px"
//   span.style.position = "absolute"
//   span.style.visibility = "hidden"
//   span.textContent = char
//   document.body.appendChild(span)
//   const width1 = span.offsetWidth
//   const height1 = span.offsetHeight

//   span.style.fontFamily = "Tofu"
//   const width2 = span.offsetWidth
//   const height2 = span.offsetHeight

//   document.body.removeChild(span)

//   const widthDiff = Math.abs(width1 - width2)
//   const heightDiff = Math.abs(height1 - height2)
//   const isSupported = widthDiff > 0 || heightDiff > 0

//   if (!fontCache) {
//     supportedCharsCache.set(font.family, new Map([[char, isSupported]]))
//   } else {
//     fontCache.set(char, isSupported)
//   }

//   return isSupported
// }

function isSupportedCharWithCanvas(font: Font, char: string) {
  if (char === " " || typeof document === "undefined") return true

  if (/^[a-zA-Z0-9]$/.test(char)) return true

  const canvas = document.createElement("canvas")
  canvas.width = 32
  canvas.height = 32
  const context = canvas.getContext("2d")
  if (!context) return false

  context.font = `32px "${font.family}", Tofu`
  context.clearRect(0, 0, 32, 32)
  context.fillText(char, 0, 16)
  const selectData = canvas.toDataURL()

  context.clearRect(0, 0, 32, 32)
  context.fillText("\uFFFF", 0, 16)
  const tofuData = canvas.toDataURL()

  const isSupported = selectData != tofuData

  if (!supportedCharsCache.has(font.family)) {
    supportedCharsCache.set(font.family, new Map([[char, isSupported]]))
  } else {
    supportedCharsCache.get(font.family)?.set(char, isSupported)
  }

  return isSupported
}

function useCharacterSupport(font: Font, text: string, mounted: boolean) {
  const [characterChecks, setCharacterChecks] = useState<
    Record<string, boolean>
  >({})
  const [checkedChars, setCheckedChars] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return

    const charsToCheck: string[] = []
    text.split("").forEach((char) => {
      if (!checkedChars.has(char) && char !== " " && char !== "\n") {
        charsToCheck.push(char)
      }
    })

    if (charsToCheck.length === 0) return

    const batchSize = 10
    let currentBatch = 0

    const processNextBatch = () => {
      const startIndex = currentBatch * batchSize
      const endIndex = startIndex + batchSize
      const currentChars = charsToCheck.slice(startIndex, endIndex)

      if (currentChars.length === 0) return

      const newResults: Record<string, boolean> = {}
      const newCheckedChars = new Set(checkedChars)

      currentChars.forEach((char) => {
        newResults[char] = isSupportedCharWithCanvas(font, char)
        // newResults[char] = isSupportedChar(font, char)
        newCheckedChars.add(char)
      })

      setCharacterChecks((prev) => ({ ...prev, ...newResults }))
      setCheckedChars(newCheckedChars)

      currentBatch++
      if (currentBatch * batchSize < charsToCheck.length) {
        setTimeout(processNextBatch, 0)
      }
    }

    processNextBatch()
  }, [font, text, mounted, checkedChars])

  const getCharSupport = useCallback(
    (char: string) => {
      if (char === " " || char === "\n") return true
      return characterChecks[char] !== undefined ? characterChecks[char] : true
    },
    [characterChecks]
  )

  const hasUnsupportedChars = useMemo(() => {
    return Object.values(characterChecks).some((supported) => !supported)
  }, [characterChecks])

  return { getCharSupport, hasUnsupportedChars }
}

interface FontCardProps {
  font: Font
  UpOrderButton: ReactNode
  DownOrderButton: ReactNode
  onDelete: React.MouseEventHandler<HTMLButtonElement>
}

export function FontCard({
  font,
  UpOrderButton,
  DownOrderButton,
  onDelete,
}: FontCardProps) {
  const [mounted, setMounted] = useState(false)
  const { text, setText } = useText()
  const { fontOptions } = useFontOptions()
  const { mode } = useMode()

  const [styles, setStyles] = useState({
    size: fontOptions.size,
    weight: fontOptions.weight,
    italic: fontOptions.italic,
    ligature: fontOptions.ligature,
  })

  const isMac = fontOptions.os === "mac"
  const { getCharSupport, hasUnsupportedChars } = useCharacterSupport(
    font,
    text,
    mounted
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setStyles((prev) => ({
      ...prev,
      size: fontOptions.size,
    }))
  }, [fontOptions.size])

  useEffect(() => {
    setStyles((prev) => ({
      ...prev,
      weight: fontOptions.weight,
    }))
  }, [fontOptions.weight])

  useEffect(() => {
    setStyles((prev) => ({
      ...prev,
      italic: fontOptions.italic,
    }))
  }, [fontOptions.italic])

  useEffect(() => {
    setStyles((prev) => ({
      ...prev,
      ligature: fontOptions.ligature,
    }))
  }, [fontOptions.ligature])

  const TextPreview = useMemo(() => {
    if (!mounted) return null

    return (
      <div className="border bg-neutral-100 dark:bg-neutral-800 p-2 rounded-md max-h-64 overflow-y-auto">
        {text.split("").map((char, i) => {
          const supported = getCharSupport(char)
          return (
            <span
              key={i}
              style={{
                fontFamily: `${font.family}, ${fontOptions.fallback}`,
                textDecoration: supported ? "none" : "underline",
                textDecorationColor: supported ? "inherit" : "red",
                fontStyle: styles.italic ? "italic" : "normal",
                fontSmooth: isMac ? "auto" : "none",
                WebkitFontSmoothing: isMac ? "auto" : "none",
                MozOsxFontSmoothing: isMac ? "auto" : "none",
                textRendering: isMac ? "optimizeLegibility" : "optimizeSpeed",
                fontSize: `${styles.size}px`,
                fontWeight: styles.weight,
                fontFeatureSettings: styles.ligature
                  ? "'liga' 1, 'calt' 1"
                  : "'liga' 0, 'calt' 0",
              }}
            >
              {char === "\n" ? <br /> : char}
            </span>
          )
        })}
      </div>
    )
  }, [
    mounted,
    text,
    font.family,
    fontOptions.fallback,
    styles,
    isMac,
    getCharSupport,
  ])

  return (
    <Card className="gap-0 py-4 space-y-2 relative">
      <CardHeader className="text-xl">
        <p className="flex items-center gap-2">
          <span>{font.family}</span>
          {mounted && (
            <>
              {font.hasLigature && (
                <Badge className="bg-green-300">Supports ligature</Badge>
              )}
              {hasUnsupportedChars && (
                <Badge className="bg-orange-300">
                  Some characters may not be supported by this font!
                </Badge>
              )}
            </>
          )}
        </p>
      </CardHeader>
      <Collapsible className="group px-6">
        <CollapsibleTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-4"
            >
              <ChevronDown className="group-data-[state=open]:rotate-180 transition-all duration-300" />
              <p className="cursor-pointer">Customize styles</p>
            </Button>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-top-5 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-5">
          <div className="flex-wrap space-y-4 p-0">
            <div className="w-full space-y-1">
              <div className="space-y-2">
                <Label className="whitespace-nowrap">Font Size</Label>
                <div className="flex items-center gap-2">
                  <Input
                    className="w-11 py-0 px-2 text-right"
                    value={styles.size}
                    onChange={(e) =>
                      setStyles((prev) => ({
                        ...prev,
                        size: parseInt(e.target.value),
                      }))
                    }
                  />
                  <Slider
                    className="w-full"
                    value={[styles.size]}
                    onValueChange={(value) =>
                      setStyles((prev) => ({ ...prev, size: value[0] }))
                    }
                    min={10}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between ml-12 -mr-2">
                <span className="text-sm">10px</span>
                <span className="text-sm">100px</span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Label>Font Weight</Label>
                <Select
                  value={styles.weight.toString()}
                  onValueChange={(value) =>
                    setStyles((prev) => ({ ...prev, weight: parseInt(value) }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select weight" />
                  </SelectTrigger>
                  <SelectContent>
                    {font.weights.map((weight) => (
                      <SelectItem key={weight} value={weight.toString()}>
                        {weight}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id={`${font.family}-italic`}
                  checked={styles.italic}
                  onCheckedChange={(checked) =>
                    setStyles((prev) => ({ ...prev, italic: checked }))
                  }
                />
                <Label
                  className="whitespace-nowrap"
                  htmlFor={`${font.family}-italic`}
                >
                  Italic
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id={`${font.family}-ligature`}
                  checked={styles.ligature}
                  onCheckedChange={(checked) =>
                    setStyles((prev) => ({ ...prev, ligature: checked }))
                  }
                />
                <Label
                  className="whitespace-nowrap"
                  htmlFor={`${font.family}-ligature`}
                >
                  Ligature
                </Label>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      {UpOrderButton}
      {DownOrderButton}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-40 top-4"
        onClick={onDelete}
      >
        <Trash2 className="text-red-500" />
      </Button>
      <CardContent className="space-y-1">
        {mode === "preview" && mounted && TextPreview}
        {mode === "editor" && (
          <Textarea
            placeholder="Type here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              fontFamily: font.family,
              fontStyle: styles.italic ? "italic" : "normal",
              fontSmooth: isMac ? "auto" : "none",
              WebkitFontSmoothing: isMac ? "auto" : "none",
              MozOsxFontSmoothing: isMac ? "auto" : "none",
              textRendering: isMac ? "optimizeLegibility" : "optimizeSpeed",
              fontSize: `${styles.size}px`,
              fontWeight: styles.weight,
              fontFeatureSettings: styles.ligature
                ? "'liga' 1, 'calt' 1"
                : "'liga' 0, 'calt' 0",
              maxHeight: "4rem",
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}
