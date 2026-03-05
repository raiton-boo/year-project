import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '今年あとどんくらい？',
  description: '今年の残り日数と進捗を見れるサイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-bg text-text">{children}</body>
    </html>
  );
}
