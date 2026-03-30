import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP, Noto_Sans_Mono } from 'next/font/google';
import './globals.css';

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

const notoSansMono = Noto_Sans_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans-mono',
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
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${notoSansMono.variable}`}
    >
      <body className="min-h-screen bg-bg text-text">{children}</body>
    </html>
  );
}
