import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        {/* ここにコンテンツを追加していく */}
      </main>
    </div>
  )
}