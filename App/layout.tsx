import "./globals.css";
import Link from 'next/link'
import { Providers } from "./providers";

export const metadata = {
  title: "Motorway Petroleum | FMS",
  description: "Fuel station management system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div style={{ display: 'flex', gap: 20, padding: 16, borderBottom: '1px solid #eee' }}>
            <Link href="/">Home</Link>
            <Link href="/stations">Stations</Link>
            <Link href="/pumps">Pumps</Link>
            <Link href="/tanks">Tanks</Link>
            <Link href="/alerts">Alerts</Link>
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}