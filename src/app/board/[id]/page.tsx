import MainBoard from "@/components/board/details/mainBoard";
import Sidebar from "@/components/board/list/sidebar";

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 py-8 md:grid-cols-4 md:px-3 py-8">
        <div className="md:col-span-3">
          <MainBoard />
        </div>
        <div className="md:col-span-1">
          <Sidebar />
        </div>
      </main>
    </div>
  );
}
