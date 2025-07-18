import { CommentRequest } from "@/types/comment";
import { tryCatch } from "../utils";
import axios from "axios";

export async function getComments(boardId: string, sort?: string, desc?: boolean) {
    return tryCatch(async () => {
        if (!desc) desc = true;
        if (!sort) sort = "createdDate";
        const response = await axios.get(`/api/comment/${boardId}`, {
            params: {
                ...(sort && { sort }),
                ...(desc && { desc }),
            },
            withCredentials: true,
        });
        return response.data;
    });
}

export async function createComment(commentRequest: CommentRequest) {
    return tryCatch(async () => {
        const response = await axios.post(`/api/comment`, commentRequest, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    });
}

export async function deleteComment(commentId: string) {
    return tryCatch(async () => {
        const response = await axios.delete(`/api/comment/${commentId}`, {
            withCredentials: true,
        });
        return response.data;
    });
}

export async function updateComment(commentId: string, commentRequest: CommentRequest) {
    return tryCatch(async () => {
        const response = await axios.patch(`/api/comment/${commentId}`, commentRequest, {
            withCredentials: true,
        });
        return response.data;
    });
}
