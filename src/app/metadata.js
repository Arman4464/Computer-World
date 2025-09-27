export const metadata = {
  title: {
    template: '%s | Computer World - Professional IT Services Surat',
    default: 'Computer World - Professional Computer Repair Services in Surat'
  },
  description: 'Professional doorstep computer repair services in Surat. Screen replacement, virus removal, hardware repair, data recovery. Same-day service with 30-day warranty.',
  keywords: ['computer repair surat', 'laptop repair surat', 'doorstep computer service', 'screen replacement surat', 'virus removal surat', 'data recovery surat'],
  authors: [{ name: 'Computer World Surat' }],
  creator: 'Computer World',
  publisher: 'Computer World',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://computerworld.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Computer World - Professional Computer Repair Services in Surat',
    description: 'Doorstep computer repair services with same-day service and 30-day warranty',
    url: 'https://computerworld.vercel.app',
    siteName: 'Computer World',
    images: [
      {
        url: '/CW-LOGO.jpg',
        width: 500,
        height: 500,
        alt: 'Computer World Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Computer World - Professional Computer Repair Services in Surat',
    description: 'Doorstep computer repair services with same-day service and 30-day warranty',
    images: ['/CW-LOGO.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
}
