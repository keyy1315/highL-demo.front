import Header from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/sidebar";
export default function VideoPage() {
    return (
        <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 py-8 md:grid-cols-4 md:px-3 py-8">
          <div className="md:col-span-3">
            <div className="rounded-lg border bg-card shadow-sm">
                <video width="100%" height="100%" controls>
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                <track kind="subtitles" src="subtitles.vtt" label="English" />
              </video>
              <div className="p-4">
                <h1 className="text-2xl font-bold">Video Title</h1>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">100 views</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">2024.10.07</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Heart className="h-5 w-5" />
                      <span>100</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <MessageCircle className="h-5 w-5" />
                      <span>100</span>
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">User123</p>
                      <p className="text-sm text-muted-foreground">User123</p>
                    </div>
                  </div>
                  <Button>Subscribe</Button>
                </div>
                <div className="mt-4 rounded-lg bg-muted p-4">
                  <p className="text-sm">Video Description</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="secondary">Tag1</Badge>
                    <Badge variant="secondary">Tag2</Badge>
                    <Badge variant="secondary">Tag3</Badge>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">100 Comments</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">User123</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                    <p className="text-sm">Great video! I really enjoyed watching this.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>V</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">VideoFan</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                    <p className="text-sm">This is exactly what I was looking for! Thanks for sharing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
            <Sidebar />
          </div>
        </main>
      </div>
    )
}
