import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

interface NotificationTriggerProps {
  count: number;
}

export function NotificationTrigger({ count }: NotificationTriggerProps) {
  return (
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        {count > 0 && (
          <Badge
            variant="outline"
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
          >
            {count}
          </Badge>
        )}
      </Button>
    </DropdownMenuTrigger>
  );
}
