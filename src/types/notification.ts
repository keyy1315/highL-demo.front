import { Member } from "./member";

export interface Notification {
    id: string;
    action: string;
    createdDate: string;
    sender: Member;
    url: string;
}

export interface NotificationRequest {
    referenceType: string;
    referenceId: string;
    commentId: string;
}
