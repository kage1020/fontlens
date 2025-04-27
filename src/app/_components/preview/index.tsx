"use client"

import { DefaultFonts } from "@/app/_components/const"
import { FontCard } from "@/app/_components/preview/font-card"
import { Font } from "@/app/_components/providers/font-options"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ArrowDown, ArrowUp, PlusCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { use, useEffect, useState } from "react"

function isEqual(a: Font, b: Font) {
  return (
    a.family === b.family &&
    a.category === b.category &&
    new Set(a.weights).size === new Set(b.weights).size &&
    new Set(a.italics).size === new Set(b.italics).size
  )
}

function isIncludes(a: Font, b: Font[]) {
  return b.map((v) => isEqual(a, v)).filter(Boolean).length > 0
}

function createLink(font: Font) {
  const link = document.createElement("link")
  link.href = `https://fonts.googleapis.com/css2?family=${font.family.replaceAll(
    " ",
    "+"
  )}&display=swap`
  link.rel = "stylesheet"
  document.head.appendChild(link)
  console.log(`Font ${font.family} added`)
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced
}

interface FontPreviewProps {
  fontsPromise: Promise<Font[]>
}

export function FontPreview({ fontsPromise }: FontPreviewProps) {
  const searchParams = useSearchParams()
  const [selectedFonts, setFonts] = useState<Font[]>(DefaultFonts)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(searchParams.get("query") ?? "")
  const fetchedFonts = use(fontsPromise)
  const filteredFetchedFonts = fetchedFonts.filter(
    (font) => !isIncludes(font, selectedFonts)
  )
  const router = useRouter()
  const debouncedQuery = useDebounce(query, 300)

  const handleQuery = (value: string) => {
    setQuery(value)
  }

  useEffect(() => {
    router.push(`/?query=${debouncedQuery}`)
  }, [debouncedQuery, router])

  return (
    <div className="grid gap-2 grid-cols-1 relative">
      <Card className="sticky top-0 z-10">
        <CardContent>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full">
                <PlusCircle />
                Add Another Font
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Command>
                <CommandInput
                  placeholder="Search for a font..."
                  value={query}
                  onValueChange={handleQuery}
                />
                <CommandList>
                  <CommandGroup heading="Default Fonts">
                    <CommandEmpty>No fonts found.</CommandEmpty>
                    {DefaultFonts.filter(
                      (font) => !isIncludes(font, selectedFonts)
                    ).map((font) => (
                      <CommandItem
                        className="pl-4"
                        key={font.family}
                        value={font.family}
                        onSelect={() => {
                          setFonts((prev) => [...prev, font])
                          setOpen(false)
                        }}
                      >
                        {font.family}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandGroup heading="More Fonts">
                    {filteredFetchedFonts.length === 0 && (
                      <CommandItem>No fonts found.</CommandItem>
                    )}
                    {filteredFetchedFonts.length > 0 &&
                      filteredFetchedFonts.map((font) => (
                        <CommandItem
                          className="pl-4"
                          key={font.family}
                          value={font.family}
                          onSelect={() => {
                            setFonts((prev) => [...prev, font])
                            createLink(font)
                            setOpen(false)
                          }}
                        >
                          {font.family}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
      {selectedFonts.map((font, i) => (
        <FontCard
          key={`${font.family}-${i}`}
          font={font}
          UpOrderButton={
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-56 top-4"
              disabled={i === 0}
              onClick={() =>
                setFonts((prev) => {
                  const newFonts = [...prev]
                  newFonts.splice(i, 1, selectedFonts[i - 1])
                  newFonts.splice(i - 1, 1, font)
                  return newFonts
                })
              }
            >
              <ArrowUp />
            </Button>
          }
          DownOrderButton={
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-48 top-4"
              disabled={i === selectedFonts.length - 1}
              onClick={() =>
                setFonts((prev) => {
                  const newFonts = [...prev]
                  newFonts.splice(i, 1, selectedFonts[i + 1])
                  newFonts.splice(i + 1, 1, font)
                  return newFonts
                })
              }
            >
              <ArrowDown />
            </Button>
          }
          onDelete={() =>
            setFonts((prev) => prev.filter((f) => f.family !== font.family))
          }
        />
      ))}
    </div>
  )
}
