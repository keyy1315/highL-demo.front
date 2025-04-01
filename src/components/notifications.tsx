"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Client } from "@stomp/stompjs";

interface Notification {
  id: number;
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  action: string;
  content: string;
  time: string;
  url: string;
}

export function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [client, setClient] = useState<Client | null>(null);

  const router = useRouter();

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: 'ws://172.25.96.1:8081/ws/websocket',
      onConnect: () => {
        console.log("connected to server");
        stompClient.subscribe('/notifications/{}', (message) => {
          const notification = JSON.parse(message.body);
          setNotifications((prevNotifications) => [...prevNotifications, notification]);
        });
      },
      onDisconnect: () => {
        console.log("disconnected from server");
      },
      onStompError: (frame) => {
        console.error("Error:", frame);
      },
    });

    stompClient.activate();
    setClient(stompClient);
    return () => {
      stompClient.deactivate();
    };
  }, []);

  const handleNotificationClick = (id: number, link: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
    setIsOpen(false);
    if(client) {
      client.publish({
        destination: '/app/notification.read',
        body: JSON.stringify({ id }),
      });
    }
    router.push(link);
  };

  const markAllAsRead = () => {
    const notificationIds = notifications.map(notification => notification.id);
    setNotifications([]);
    if(client) {
      client.publish({
        destination: '/app/notification.read',
        body: JSON.stringify({ ids: notificationIds })
      });
    }
  };

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
                onClick={() =>
                  handleNotificationClick(notification.id, notification.url)
                }
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={notification.user.avatar}
                    alt={notification.user.name}
                  />
                  <AvatarFallback>
                    {notification.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">
                      {notification.user.name}
                    </span>{" "}
                    {notification.action}
                  </p>
                  {notification.content && (
                    <p className="text-xs text-muted-foreground">
                      {notification.content}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="flex h-20 items-center justify-center p-4 text-center">
              <p className="text-sm text-muted-foreground">
                No new notifications
              </p>
            </div>
          )}
        </DropdownMenuGroup>
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
