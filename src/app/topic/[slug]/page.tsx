"use client";

import { use } from "react";

import TopicHeader from "@/components/board/list/topic-header";
import VideoFeed from "@/components/board/list/video-feed";
import Header from "@/components/header/header";
import Sidebar from "@/components/board/list/sidebar";

export default function TopicPage({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = use(params);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 py-8 md:grid-cols-4 md:px-3 py-8">
        <div className="md:col-span-3">
          <TopicHeader topicName={slug} />
          <VideoFeed category={slug} />
        </div>
        <div className="md:col-span-1">
          <Sidebar currentparam={slug} />
        </div>
      </main>
    </div>
  );
}
