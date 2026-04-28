import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Azzam Fajro | Full Stack Developer Portfolio",
  description: "Portfolio website of Azzam Fajro - A passionate Full Stack Developer creating beautiful, functional, and user-centered digital experiences.",
  keywords: ["developer", "portfolio", "web developer", "full stack", "react", "next.js", "indonesia"],
  authors: [{ name: "Azzam Fajro" }],
  creator: "Azzam Fajro",
  openGraph: {
    title: "Azzam Fajro | Full Stack Developer Portfolio",
    description: "Portfolio website of Azzam Fajro - A passionate Full Stack Developer creating beautiful, functional, and user-centered digital experiences.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Azzam Fajro | Full Stack Developer Portfolio",
    description: "Portfolio website of Azzam Fajro - A passionate Full Stack Developer creating beautiful, functional, and user-centered digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Bricolage+Grotesque:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
