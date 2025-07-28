"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RecentBoards from "./recentBoards";
import FollowingBoards from "./followingBoards";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSearchParams } from "next/navigation";

export default function VideoFeed() {
  const { isLoggedIn } = useAuthStore();
  const params = useSearchParams().get("category");

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
          <RecentBoards category={params as string} />
        </TabsContent>
        {isLoggedIn && (
          <TabsContent value="following" className="mt-6">
            <FollowingBoards category={params as string} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
