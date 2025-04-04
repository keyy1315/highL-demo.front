import { Member } from "./member";

export interface Notification {
    id: string;
    action: NotificationType;
    description: string | null;
    createdDate: string;
    sender: Member;
    url: string;
}

export interface NotificationRequest {
    action: NotificationType;
    referenceType: string;
    referenceId: string;
    commentId: string | null;
}

export type NotificationType = "COMMENT" | "LIKE" | "FOLLOW" | "MENTION";