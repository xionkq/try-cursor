import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '贪吃蛇游戏',
  description: 'Next.js贪吃蛇游戏',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
} 