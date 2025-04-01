"use client";
import { useState } from "react";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const videos = [
  {
    id: 1,
    title: "Video 1", 
    description: "Description 1",
    author: {
      user_id: "kkk",
      user_name: "John Doe",
      user_tag: "KR1",
      avatar: "https://via.placeholder.com/150",
    },
    thumbnail: "",
    likes: 100,
    comments: 50,
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    id: 2,
    title: "Video 2",
    description: "Description 2", 
    author: {
      user_id: "kkk",
      user_name: "John Doe",
      user_tag: "KR1",
      avatar: "https://via.placeholder.com/150",
    },
    thumbnail: "",
    likes: 100,
    comments: 50,
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    id: 3,
    title: "Video 3",
    description: "Description 3",
    author: {
      user_id: "kkk", 
      user_name: "John Doe",
      user_tag: "KR1",
      avatar: "https://via.placeholder.com/150",
    },
    thumbnail: "",
    likes: 100,
    comments: 50,
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    id: 4,
    title: "Video 4",
    description: "Description 4",
    author: {
      user_id: "kkk",
      user_name: "John Doe", 
      user_tag: "KR1",
      avatar: "https://via.placeholder.com/150",
    },
    thumbnail: "",
    likes: 100,
    comments: 50,
    tags: ["tag1", "tag2", "tag3"],
  },
];

export default function VideoFeed() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Recent");
  const [likedVideos, setLikedVideos] = useState<number[]>([]);

  const toggleLike = (e: React.MouseEvent, videoId: number) => {
    e.stopPropagation();
    if (likedVideos.includes(videoId)) {
      setLikedVideos(likedVideos.filter((id) => id !== videoId));
    } else {
      setLikedVideos([...likedVideos, videoId]);
    }
  };

  const handleVideoClick = (videoId: number) => {
    router.push(`/board/${videoId}`);
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="Recent" onClick={() => setActiveTab("Recent")}>
            Recent
          </TabsTrigger>
          <TabsTrigger
            value="following"
            onClick={() => setActiveTab("following")}
          >
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Recent" className="mt-6 space-y-8">
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="rounded-lg border bg-card shadow-sm cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handleVideoClick(video.id)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={video.author.avatar}
                        alt={video.author.user_name}
                      />
                      <AvatarFallback>
                        {video.author.user_id.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{video.author.user_name}</p>
                        <p className="text-sm text-gray-500">
                          #{video.author.user_tag}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {video.author.user_id}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{video.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {video.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {video.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              {/* <VideoPlayer thumbnail={video.thumbnail} /> */}
              <video width="100%" height="100%" controls onClick={(e) => e.stopPropagation()}>
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                <track kind="subtitles" src="subtitles.vtt" label="English" />
              </video>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={(e) => toggleLike(e, video.id)}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        likedVideos.includes(video.id)
                          ? "fill-red-500 text-red-500"
                          : ""
                      }`}
                    />
                    <span>
                      {likedVideos.includes(video.id)
                        ? video.likes + 1
                        : video.likes}
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>{video.comments}</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="following" className="mt-6">
          <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
            <p className="text-center text-muted-foreground">
              Videos from creators you follow will appear here.
              <br />
              Start following creators to see their content!
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
