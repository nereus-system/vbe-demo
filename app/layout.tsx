import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { darkTheme } from '@/theme/createTheme'
import './globals.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VBE Demo',
  description: 'A Next.js 14 project with TypeScript and MUI v6',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

