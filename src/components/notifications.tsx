"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

// Sample notification data
const initialNotifications = [
  {
    id: 1,
    user: {
      name: "Min-ji Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "@minjikim",
    },
    action: "liked your video",
    content: "Amazing sunset at the beach",
    time: "2 minutes ago",
    link: "/video/1", // Link to the video
  },
  {
    id: 2,
    user: {
      name: "Jun-ho Park",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "@chefpark",
    },
    action: "commented on your video",
    content: "Quick cooking tutorial",
    time: "15 minutes ago",
    link: "/video/2", // Link to the video with comment
  },
  {
    id: 3,
    user: {
      name: "Soo-jin Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "@soojinmusic",
    },
    action: "subscribed to your channel",
    content: "",
    time: "1 hour ago",
    link: "/profile/soojinmusic", // Link to the user's profile
  },
  {
    id: 4,
    user: {
      name: "VideoHub",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "@videohub",
    },
    action: "Your video is trending",
    content: "Seoul night drive - lofi music",
    time: "3 hours ago",
    link: "/analytics/trending", // Link to analytics page
  },
]

export function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleNotificationClick = (id: number, link: string) => {
    // First remove the notification
    setNotifications(notifications.filter((notification) => notification.id !== id))

    // Then close the dropdown
    setIsOpen(false)

    // Finally navigate to the link
    router.push(link)
  }

  const markAllAsRead = () => {
    setNotifications([])
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <Badge
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
              variant="destructive"
            >
              {notifications.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {notifications.length > 0 && (
            <Badge variant="outline" className="font-normal">
              {notifications.length} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex cursor-pointer gap-4 p-3"
                onClick={() => handleNotificationClick(notification.id, notification.link)}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                  <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">{notification.user.name}</span> {notification.action}
                  </p>
                  {notification.content && <p className="text-xs text-muted-foreground">{notification.content}</p>}
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="flex h-20 items-center justify-center p-4 text-center">
              <p className="text-sm text-muted-foreground">No new notifications</p>
            </div>
          )}
        </DropdownMenuGroup>
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button variant="outline" size="sm" className="w-full" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

