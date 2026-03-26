import type { Metadata, Viewport } from 'next';
import { Orbitron, Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '今年あとどんくらい？',
  description: '今年の残り日数と進捗を見れるサイト',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${orbitron.variable} ${notoSansJp.variable} min-h-screen bg-bg text-text`}
        style={{ fontFamily: notoSansJp.style.fontFamily }}
      >
        {children}
      </body>
    </html>
  );
}
