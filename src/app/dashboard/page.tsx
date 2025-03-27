import Header from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import Image from "next/image"

// Sample data for the chart
const viewsData = [
  { name: "Mon", views: 4000 },
  { name: "Tue", views: 3000 },
  { name: "Wed", views: 2000 },
  { name: "Thu", views: 2780 },
  { name: "Fri", views: 1890 },
  { name: "Sat", views: 2390 },
  { name: "Sun", views: 3490 },
]

export default function TrendingAnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your video performance and audience engagement</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127.4K</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+12.5%</span> from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.2K hours</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+5.2%</span> from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+843</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+18.7%</span> from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Trending Videos</CardTitle>
              <CardDescription>Your videos that are currently trending on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-4">
                    <div className="aspect-video w-40 rounded-md overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=480&width=854"
                        alt="Video thumbnail"
                        width={854}
                        height={480}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Seoul night drive - lofi music</h3>
                        <Badge variant="secondary">Trending #1</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">Published 3 days ago • 89.7K views</p>
                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="font-medium">Performance:</span> This video is performing better than 95% of
                          your recent videos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-4">
                    <div className="aspect-video w-40 rounded-md overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=480&width=854"
                        alt="Video thumbnail"
                        width={854}
                        height={480}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Amazing sunset at the beach</h3>
                        <Badge variant="secondary">Trending #8</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">Published 1 week ago • 45.3K views</p>
                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="font-medium">Performance:</span> This video is performing better than 82% of
                          your recent videos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Views Over Time</CardTitle>
              <CardDescription>Daily view count for the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={viewsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

