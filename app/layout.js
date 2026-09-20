import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const SITE_URL = "https://portfolio-chandrasekhar.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Chandra Sekhar Rao | Frontend Engineer | React & Next.js",
  description:
    "Portfolio of Chandra Sekhar Rao, a software engineer with around 5 years of experience building modern web applications using React.js, JavaScript, Next.js, Node.js, Python and AWS.",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Chandra Sekhar Rao | Frontend Engineer | React & Next.js",
    description:
      "Software engineer with around 5 years of experience building modern web applications using React.js, JavaScript, Next.js, Node.js, Python and AWS.",
    url: SITE_URL,
    siteName: "Chandra Sekhar Rao — Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandra Sekhar Rao | Frontend Engineer | React & Next.js",
    description:
      "Software engineer with around 5 years of experience building modern web applications using React.js, JavaScript, Next.js, Node.js, Python and AWS.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.theme;var isDark=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(isDark){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased leading-7 overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
