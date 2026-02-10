import type { Metadata } from "next";
import { Antonio, Roboto } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { CSPostHogProvider } from "./providers";

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blog.echinstitute.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ECH Institute Blog",
    template: "%s | ECH Institute Blog",
  },
  description: "The official blog of the ECH Institute. Herding Knowledge, Building Community, Homesteading Ethereum! Stay updated with the latest insights on Ethereum protocol development, EIPs, and ecosystem news.",
  keywords: [
    "ECH Institute",
    "Ethereum Institute",
    "Ethereum blog",
    "EIP",
    "Ethereum Improvement Proposals",
    "Ethereum protocol",
    "blockchain education",
    "Ethereum community",
    "Ethereum development",
    "Ethereum news",
    "PEEPanEIP",
    "Ethereum ecosystem",
    "echinstitute",
    "Ethereum research",
    "Ethereum education",
  ],
  authors: [{ name: "ECH Institute" }],
  creator: "ECH Institute",
  publisher: "ECH Institute",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ECH Institute Blog",
    title: "ECH Institute Blog",
    description: "The official blog of the ECH Institute. Herding Knowledge, Building Community, Homesteading Ethereum!",
    images: [
      {
        url: `${siteUrl}/ech_full_logo_inverted.png`,
        width: 1200,
        height: 630,
        alt: "ECH Institute Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ECH Institute Blog",
    description: "The official blog of the ECH Institute. Herding Knowledge, Building Community, Homesteading Ethereum!",
    images: [`${siteUrl}/ech_full_logo_inverted.png`],
    creator: "@EthCatHerders",
    site: "@EthCatHerders",
  },
  icons: {
    icon: '/ech_full_logo_inverted.png',
    apple: '/ech_full_logo_inverted.png',
  },
  alternates: {
    canonical: siteUrl,
    types: {
      'application/rss+xml': [{
        title: "Blog Posts",
        url: `${siteUrl}/feed.xml`,
      }],
    },
  },
  verification: {
    // Add Google Search Console verification when available
    // google: "your-verification-code",
  },
  // SEO: Additional metadata for better search visibility
  category: "Technology",
  classification: "Blog",
  other: {
    // SEO: Preconnect hints for performance (handled via Next.js font optimization)
    // Fonts are already optimized via next/font
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SEO: Enhanced Organization structured data with comprehensive information
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ECH Institute",
    alternateName: "Ethereum Cat Herders Institute",
    url: "https://echinstitute.org",
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/ech_full_logo_inverted.png`,
      width: 1200,
      height: 630,
    },
    description: "ECH Institute - Herding Knowledge, Building Community, Homesteading Ethereum! We provide education, resources, and community support for Ethereum protocol development, EIPs, and ecosystem growth.",
    foundingDate: "2018",
    sameAs: [
      "https://x.com/EthCatHerders",
      "https://github.com/echinstitute",
      "https://www.youtube.com/@ethcatherders",
      "https://www.reddit.com/r/ethcatherders",
      "https://www.linkedin.com/company/ethcatherders",
      "https://warpcast.com/ethcatherders",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: "https://echinstitute.org",
      availableLanguage: "English",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
  };

  return (
    <html lang="en">
      <body
        className={`${antonio.variable} ${roboto.variable} antialiased`}
      >
        {/* SEO: Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <CSPostHogProvider>
          {children}
          <div className="flex-grow" />
          <Footer />
        </CSPostHogProvider>
      </body>
    </html>
  );
}
