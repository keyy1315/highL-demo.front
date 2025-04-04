"use client";

import { Notification } from "@/types/notification";
import { NotificationItem } from "./notification-items";

interface NotificationListProps {
    notifications: Notification[];
    onNotificationClick: (id: string, url: string) => void;
}

export function NotificationList({notifications, onNotificationClick}: NotificationListProps) {
    return(
        <div className="max-h-[300px] overflow-y-auto">
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onNotificationClick={onNotificationClick}
                    />
                ))
            ) : (
                <div className="flex h-20 items-center justify-center p-4 text-center">
                    <p className="text-sm text-muted-foreground">No New Notifications</p>
                </div>
            )}
        </div>
    );
}