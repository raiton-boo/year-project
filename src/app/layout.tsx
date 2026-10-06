import type { Metadata } from 'next';
import { Fredoka, Zen_Maru_Gothic } from 'next/font/google';
import './globals.css';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-fredoka',
});

const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-zen-maru-gothic',
});

export const metadata: Metadata = {
  title: 'サイト名(仮)',
  description: '今年の残りを視覚的に伝えるサイト',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${fredoka.variable} ${zenMaruGothic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
