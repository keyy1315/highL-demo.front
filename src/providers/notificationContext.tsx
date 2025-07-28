"use client";

import { Notification, NotificationRequest } from "@/types/notification";
import { useNotification } from "@/hooks/useNotification";
import { createContext, useContext, ReactNode } from "react";

interface NotificationContextType {
    notifications: Notification[];
    sendNotification: (notificationRequest: NotificationRequest) => void;
    handleNotificationClick: (id: string, link: string) => void;
    markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({children}: {children: ReactNode}) {
    const {notifications, sendNotification, handleNotificationClick, markAllAsRead} = useNotification();

    return (
        <NotificationContext.Provider value={{notifications, sendNotification, handleNotificationClick, markAllAsRead}}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if(context === undefined) {
        throw new Error("useNotificationContext must be used within a NotificationProvider");
    }
    return context;
};
