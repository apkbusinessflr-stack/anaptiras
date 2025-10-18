
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

export const metadata = {
  title: 'Anaptiras',
  description: 'Ghost for the soul. Crew for the laughs.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
