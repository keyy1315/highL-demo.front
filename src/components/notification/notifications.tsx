"use client";

import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { NotificationTrigger } from "./notification-trigger";
import { useNotification } from "@/hooks/useNotification";
import { NotificationHeader } from "./notification-header";
import { NotificationList } from "./notification-list";

export function Notifications() {
    const {isOpen, setIsOpen, notifications, handleNotificationClick, markAllAsRead} = useNotification();

    return(
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <NotificationTrigger count={notifications.length} />
            <DropdownMenuContent className="w-80" align="end">
                <NotificationHeader notificationCount={notifications.length}/>
                <NotificationList 
                    notifications={notifications} 
                    onNotificationClick={handleNotificationClick}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}