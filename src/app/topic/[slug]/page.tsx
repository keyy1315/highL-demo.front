import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import TopicHeader from "@/components/topic-header";
import VideoFeed from "@/components/video-feed";

export default async function TopicPage({ params }: { params: { slug: string } }) {
  const topicName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 py-8 md:grid-cols-3 md:px-6 py-8">
        <div className="md:col-span-2">
          <TopicHeader topicName={topicName} />
          <VideoFeed />
        </div>
        <Sidebar currentparam={topicName} />
      </main>
    </div>
  );
}
