import VideoFeed from "@/components/video-feed";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="m9 8 6 4-6 4Z" />
            </svg>
            <span className="text-xl font-bold">Highlighter</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="relative h-8 w-8 overflow-hidden rounded-full">
              <Avatar>
                <AvatarImage
                  src="https://via.placeholder.com/150"
                  alt="User avatar"
                />
                <AvatarFallback>
                  U
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 py-8 md:grid-cols-3 md:px-6 py-8">
        <div className="md:col-span-2">
          <VideoFeed />
        </div>
        <aside className="hidden space-y-6 md:block">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Trending Topics</h2>
            <div className="space-y-2">
              {["Gaming", "Music", "Travel", "Cooking", "Tech"].map((topic) => (
                <div key={topic} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Suggested Creators</h2>
            <div className="space-y-4">
              {[
                { name: "Alex Kim", followers: "1.2M" },
                { name: "Jessica Park", followers: "845K" },
                { name: "David Lee", followers: "623K" },
              ].map((creator) => (
                <div key={creator.name} className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Avatar>
                      <AvatarImage
                        src="https://via.placeholder.com/150"
                        alt="User avatar"
                      />
                      <AvatarFallback>
                        {"U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{creator.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {creator.followers} followers
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
