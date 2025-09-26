import './globals.css'

export const metadata = {
  title: 'Computer World - Your IT Partner',
  description: 'Professional computer repair services in Surat',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
