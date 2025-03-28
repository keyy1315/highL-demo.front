import VideoFeed from "@/components/video-feed";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 py-8 md:grid-cols-3 md:px-6 py-8">
        <div className="md:col-span-2">
          <VideoFeed />
        </div>
        <Sidebar />
      </main>
    </div>
  );
}
