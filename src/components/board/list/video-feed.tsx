"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RecentBoards from "./recent-board";
import FollowingBoards from "./following-boards";

export default function VideoFeed({ category }: { category: string | null }) {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="Recent" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="Recent">Recent</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>

        <TabsContent value="Recent" className="mt-6">
          <RecentBoards category={category} />
        </TabsContent>

        <TabsContent value="following" className="mt-6">
          <FollowingBoards category={category} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
