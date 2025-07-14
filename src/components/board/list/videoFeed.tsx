"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RecentBoards from "./recentBoards";
import FollowingBoards from "./followingBoards";
import { useAuthStore } from "@/stores/useAuthStore";

export default function VideoFeed({ category }: { category: string | null }) {
  const { isLoggedIn } = useAuthStore();

  return (
    <div className="space-y-8">
      <Tabs defaultValue="Recent" className="w-full">
        <TabsList
          className={`grid w-full grid-cols-2 md:w-[400px] ${
            isLoggedIn ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          <TabsTrigger value="Recent">Recent</TabsTrigger>
          {isLoggedIn && <TabsTrigger value="following">Following</TabsTrigger>}
        </TabsList>
        <TabsContent value="Recent" className="mt-6">
          <RecentBoards category={category} />
        </TabsContent>
        {isLoggedIn && (
          <TabsContent value="following" className="mt-6">
            <FollowingBoards category={category} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
