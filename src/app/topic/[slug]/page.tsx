"use client";

import { use } from "react";

import TopicHeader from "@/components/topic-header";
import VideoFeed from "@/components/video-feed";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function TopicPage({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = use(params);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 py-8 md:grid-cols-3 md:px-6 py-8">
        <div className="md:col-span-2">
          <TopicHeader topicName={slug} />
          <VideoFeed category={slug} />
        </div>
        <Sidebar currentparam={slug} />
      </main>
    </div>
  );
}
