import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Azzam Fajro — Pengembang Web Freelance',
  description:
    'Portofolio Azzam Fajro — Freelancer pengembang web Laravel & Next.js, mantan magang PT Ubig.id, SMKN 1 Bangil.',
  keywords: [
    'Azzam Fajro',
    'developer',
    'portofolio',
    'web developer',
    'full stack',
    'laravel',
    'next.js',
    'indonesia',
    'freelance',
  ],
  authors: [{ name: 'Muhammad Azzam Fajro' }],
  creator: 'Muhammad Azzam Fajro',
  metadataBase: new URL('https://azzamfajro.my.id'),
  openGraph: {
    title: 'Azzam Fajro — Pengembang Web Freelance',
    description:
      'Portofolio Azzam Fajro — Freelancer pengembang web Laravel & Next.js.',
    type: 'website',
    locale: 'id_ID',
    url: 'https://azzamfajro.my.id',
    siteName: 'Azzam Fajro',
    images: [{ url: '/porto_land.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azzam Fajro — Pengembang Web Freelance',
    description: 'Portofolio Azzam Fajro — Freelancer pengembang web Laravel & Next.js.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://azzamfajro.my.id' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Fraunces — display serif */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,800;0,9..144,900;1,9..144,900&family=Hanken+Grotesk:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Theme init — no flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme'),p=window.matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.setAttribute('data-theme',s||(p?'dark':'light'));}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
