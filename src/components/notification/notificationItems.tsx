"use client";

import { Notification } from "@/types/notification";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { formatDistanceToNow, differenceInSeconds } from "date-fns";
import { ko } from "date-fns/locale";

interface NotificationItemProps {
  notification: Notification;
  onNotificationClick: (id: string, url: string) => void;
}

export function NotificationItem({
  notification,
  onNotificationClick,
}: NotificationItemProps) {
  const getTimeAgo = () => {
    const seconds = differenceInSeconds(
      new Date(),
      new Date(notification.createdDate)
    );
    if (seconds < 60) {
      return `${seconds}초 전`;
    }
    return formatDistanceToNow(new Date(notification.createdDate), {
      addSuffix: true,
      locale: ko,
    });
  };

  return (
    <DropdownMenuItem
      className="flex cursor-pointer gap-4 p-3"
      onClick={() => onNotificationClick(notification.id, notification.url)}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage
          src={notification.sender.iconUrl}
          alt={notification.sender.id}
        />
        <AvatarFallback>
          {notification.sender.id.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">
          <span className="font-medium">{notification.sender.id}</span>{" "}
          {notification.action}
        </p>
        <p className="text-xs text-muted-foreground">{getTimeAgo()}</p>
      </div>
    </DropdownMenuItem>
  );
}
