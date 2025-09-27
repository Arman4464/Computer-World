import './globals.css'
import { ToastProvider } from '@/components/Toast'

export const metadata = {
  title: 'Computer World - Your IT Partner',
  description: 'Professional computer repair services in Surat',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
