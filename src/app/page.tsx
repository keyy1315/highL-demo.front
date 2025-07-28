"use client";

import VideoFeed from "@/components/board/list/videoFeed";
import Sidebar from "@/components/board/list/sidebar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 py-8 md:grid-cols-4 md:px-3">
        <div className="md:col-span-3">
          <VideoFeed />
        </div>
        <div className="md:col-span-1">
          <Sidebar />
        </div>
      </main>
    </div>
  );
}
