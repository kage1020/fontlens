import { OptionProvider } from "@/app/_components/providers"
import { OptionSidebar } from "@/app/_components/sidebar"
import { ThemeSwitch } from "@/app/_components/theme-switch"
import { SidebarProvider } from "@/components/ui/sidebar"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Font Lens",
  description: "A simple web application for comparing and previewing fonts.",
  metadataBase: new URL("https://fontlens.kage1020.com"),
  openGraph: {
    siteName: "Font Lens",
    url: "https://fontlens.kage1020.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans+JP:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-neutral-100 dark:bg-neutral-800 relative">
        <OptionProvider>
          <ThemeSwitch className="fixed top-4 right-4" />
          <SidebarProvider>
            <OptionSidebar />
            {children}
          </SidebarProvider>
        </OptionProvider>
      </body>
    </html>
  )
}
