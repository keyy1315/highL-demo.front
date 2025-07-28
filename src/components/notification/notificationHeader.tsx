"use client";

import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Badge } from "../ui/badge";

interface NotificationHeaderProps {
  notificationCount: number;
}

export function NotificationHeader({
  notificationCount,
}: NotificationHeaderProps) {
  return (
    <>
      <DropdownMenuLabel className="flex items-center justify-between">
        <span>Notifications</span>
        {notificationCount > 0 && (
          <Badge variant="outline" className="font-normal">
            {notificationCount}
          </Badge>
        )}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
    </>
  );
}
