import type { Metadata, Viewport } from 'next';
import { Orbitron } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const hitoriGothic = localFont({
  src: '../../public/fonts/HitoriGothic/ひとりゴシック.ttf',
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
        className={`${orbitron.variable} min-h-screen bg-bg text-text`}
        style={{ fontFamily: hitoriGothic.style.fontFamily }}
      >
        {children}
      </body>
    </html>
  );
}
