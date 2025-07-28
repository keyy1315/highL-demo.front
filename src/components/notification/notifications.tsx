"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { NotificationTrigger } from "./notificationTrigger";
import { useNotification } from "@/hooks/useNotification";
import { NotificationHeader } from "./notificationHeader";
import { NotificationList } from "./notificationList";

export function Notifications() {
  const {
    isOpen,
    setIsOpen,
    notifications,
    handleNotificationClick,
    markAllAsRead,
  } = useNotification();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <NotificationTrigger count={notifications.length} />
      <DropdownMenuContent className="w-80" align="end">
        <NotificationHeader notificationCount={notifications.length} />
        <NotificationList
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
