import { Member } from "../member/member";

export interface Notification {
    id: string;
    action: string;
    createdDate: string;
    sender: Member;
    url: string;
}
