"use client"

import { TEXTS } from "@/app/_components/const"
import { Windows } from "@/app/_components/icons"
import { OS, useFontOptions } from "@/app/_components/providers/font-options"
import { Mode, useMode } from "@/app/_components/providers/mode"
import { useText } from "@/app/_components/providers/text"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Apple, Code2, Globe } from "lucide-react"

const weightOptions = [100, 200, 300, 400, 500, 600, 700, 800, 900]

export function OptionSidebar() {
  const { fontOptions, setFontOptions } = useFontOptions()
  const { text, setText } = useText()
  const { mode, setMode } = useMode()

  return (
    <Sidebar>
      <SidebarHeader className="py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Font Lens
        </h1>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup className="space-y-3">
          <Label className="whitespace-nowrap">Text</Label>
          <Select
            defaultValue="ASCII"
            onValueChange={(key) =>
              setText({ ...TEXTS.programming, ...TEXTS.languages }[key]!)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a text" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Programming</SelectLabel>
                {Object.keys(TEXTS.programming).map((key) => (
                  <SelectItem key={key} value={key} className="pl-4">
                    {key.toLowerCase()}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {Object.keys(TEXTS.languages).map((key) => (
                  <SelectItem key={key} value={key} className="pl-4">
                    {key.toLowerCase()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="resize-none !text-lg"
            placeholder="Type here..."
          />
        </SidebarGroup>
        <SidebarGroup className="space-y-3">
          <Label className="whitespace-nowrap">Font Size</Label>
          <div className="flex items-center gap-2">
            <Input
              className="w-11 py-0 px-2 text-right"
              value={fontOptions.size}
              onChange={(e) =>
                setFontOptions((prev) => ({
                  ...prev,
                  size: parseInt(e.target.value),
                }))
              }
            />
            <Slider
              value={[fontOptions.size]}
              onValueChange={(value) =>
                setFontOptions((prev) => ({ ...prev, size: value[0] }))
              }
              min={10}
              max={100}
              step={1}
            />
          </div>
          <div className="flex items-center justify-between ml-9 -mr-3">
            <span className="text-sm">10px</span>
            <span className="text-sm">100px</span>
          </div>
        </SidebarGroup>
        <SidebarGroup className="space-y-3">
          <Label className="whitespace-nowrap">Font Weight</Label>
          <Slider
            value={[fontOptions.weight]}
            onValueChange={(value) =>
              setFontOptions((prev) => ({ ...prev, weight: value[0] }))
            }
            min={100}
            max={900}
            step={100}
          />
          <div className="flex items-center justify-between -mx-2">
            {weightOptions.map((weight) => (
              <span key={weight} className="text-sm">
                {weight}
              </span>
            ))}
          </div>
        </SidebarGroup>
        <SidebarGroup className="flex-row items-center gap-8">
          <div className="flex items-center gap-2">
            <Switch
              id="italic"
              checked={fontOptions.italic}
              onCheckedChange={(checked) =>
                setFontOptions((prev) => ({ ...prev, italic: checked }))
              }
            />
            <Label className="whitespace-nowrap" htmlFor="italic">
              Italic
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="ligature"
              checked={fontOptions.ligature}
              onCheckedChange={(checked) =>
                setFontOptions((prev) => ({ ...prev, ligature: checked }))
              }
            />
            <Label className="whitespace-nowrap" htmlFor="ligature">
              Ligature
            </Label>
          </div>
        </SidebarGroup>
        <SidebarGroup className="space-y-3">
          <Label className="whitespace-nowrap">OS</Label>
          <Tabs
            defaultValue="mac"
            value={fontOptions.os}
            onValueChange={(value) =>
              setFontOptions((prev) => ({ ...prev, os: value as OS }))
            }
          >
            <TabsList className="w-full">
              <TabsTrigger value="mac">
                <Apple />
                Mac
              </TabsTrigger>
              <TabsTrigger value="windows">
                <Windows />
                Windows
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </SidebarGroup>
        <SidebarGroup className="space-y-3">
          <Label className="whitespace-nowrap">Mode</Label>
          <Tabs
            defaultValue="preview"
            value={mode}
            onValueChange={(value) => setMode(value as Mode)}
          >
            <TabsList className="w-full">
              <TabsTrigger value="preview">
                <Globe />
                Preview
              </TabsTrigger>
              <TabsTrigger value="editor">
                <Code2 />
                Editor
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </SidebarGroup>
        <SidebarGroup className="space-y-3">
          <Label className="whitespace-nowrap">Fallback Font</Label>
          <Select
            defaultValue="Tofu"
            onValueChange={(value) =>
              setFontOptions((prev) => ({ ...prev, fallback: value }))
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fallback font" />
            </SelectTrigger>
            <SelectContent>
              {[
                "Tofu",
                "Inter",
                "Meiryo",
                "Noto Sans JP",
                "源ノ角ゴシック",
              ].map((font) => (
                <SelectItem key={font} value={font} className="pl-4">
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <span className="text-center">@kage1020</span>
      </SidebarFooter>
    </Sidebar>
  )
}
