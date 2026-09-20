import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./print.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { Providers } from "@/components/providers/Providers";
import { Toaster } from "@/components/design-system";
import PWARegister from "@/components/pwa/PWARegister";
import OfflineStatusBanner from "@/components/pwa/OfflineStatusBanner";
import SmoothScrolling from "@/components/ui/SmoothScrolling";
import { LenisWrapperProvider } from "@/components/providers/LenisWrapperProvider";

// Use system fonts as fallback when Google Fonts aren't available
const fontVariables = '';

export const metadata: Metadata = {
  title: "Amprator Shipping - Management Dashboard",
  description: "Vehicle shipping management dashboard for USA and Canada to Afghanistan shipments through the Mersin or UAE route.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/icon', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: ['/favicon.png'],
    apple: [{ url: '/apple-icon', type: 'image/png', sizes: '180x180' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Amprator",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#C9A24C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en" className={fontVariables} dir="ltr" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen bg-background antialiased" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <Providers>
          <PWARegister />
          <OfflineStatusBanner />
          <LenisWrapperProvider>
            <SmoothScrolling>
            <div className="relative flex min-h-screen flex-col">
              <ConditionalLayout>
                {children}
              </ConditionalLayout>
            </div>
              <Toaster />
            </SmoothScrolling>
          </LenisWrapperProvider>
        </Providers>
      </body>
    </html>
  );
}
