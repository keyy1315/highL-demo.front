import { useNotificationContext } from "@/context/notification-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import {Bell} from "lucide-react";
import { Badge } from "../ui/badge";
import { NotificationList } from "./notification-list";

export function NotificationBell() {
    const {notifications, handleNotificationClick} = useNotificationContext();

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                        <Badge
                           className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                           variant="destructive">
                            {notifications.length}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700" align="end">
                <NotificationList 
                    notifications={notifications}
                    onNotificationClick={handleNotificationClick}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}