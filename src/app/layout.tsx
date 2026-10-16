import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Caveat } from 'next/font/google';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { WhatsAppFloatingButton } from '@/components/WhatsAppFloatingButton';

// Auto-hosted Google Font Plus Jakarta Sans with weights 400, 500, 600, 700, 800
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

// Handwritten script font for "L'actu PhamaFind"
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-script',
  display: 'swap',
});

// Comprehensive SEO Metadata
export const metadata: Metadata = {
  title: 'PhamaFind - Recherche et livraison de médicaments en 1h à Douala',
  description:
    'Trouvez rapidement vos médicaments dans les pharmacies de garde à Douala (Akwa, Bonapriso, Deido, Bonamoussadi). Livraison express en 1h max, ordonnance sécurisée et paiement Mobile Money.',
  keywords: [
    'pharmacie douala',
    'livraison médicaments douala',
    'pharmacie de garde cameroun',
    'phamafind',
    'coartem douala',
    'doliprane cameroun',
    'parapharmacie douala',
    'orange money pharmacie',
    'mtn momo médicaments',
  ],
  authors: [{ name: 'PhamaFind Cameroun' }],
  openGraph: {
    title: 'PhamaFind - Pharmacie en ligne & Livraison express en 1h à Douala',
    description:
      'Service de recherche et livraison de médicaments à Douala, Cameroun. Accédez aux stocks des officines de garde officielles.',
    url: 'https://phamafind.cm',
    siteName: 'PhamaFind',
    locale: 'fr_FR',
    type: 'website',
  },
  metadataBase: new URL('https://phamafind.cm'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org LocalBusiness structured data for Douala
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Pharmacy',
    name: 'PhamaFind Douala',
    description:
      'Plateforme de recherche et de livraison de médicaments en 1h auprès des pharmacies de garde partenaires à Douala.',
    url: 'https://phamafind.cm',
    telephone: '+237681192943',
    priceRange: '1000 - 50000 FCFA',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Boulevard de la Liberté, Akwa',
      addressLocality: 'Douala',
      addressRegion: 'Littoral',
      addressCountry: 'CM',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 4.0511,
      longitude: 9.7679,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: 'Douala',
    },
    paymentAccepted: ['Cash', 'Orange Money', 'MTN Mobile Money'],
    currenciesAccepted: 'XAF',
  };

  return (
    <html lang="fr" className={`${jakarta.variable} ${caveat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="bg-page text-body font-sans min-h-screen flex flex-col antialiased">
        <ShopProvider>
          <AnnouncementBar />
          <Header />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
        </ShopProvider>
      </body>
    </html>
  );
}
