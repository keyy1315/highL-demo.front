import { api } from "./axios-instance";
import { CommentRequest } from "@/types/comment";

export async function getComments(boardId: string, sort?: string, desc?: boolean) {
    if (!desc) desc = true;
    if (!sort) sort = "createdDate";
    try {
        const response = await api.get(`/comment/${boardId}`, {
            params: {
                ...(sort && { sort }),
                ...(desc && { desc }),
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function createComment(commentRequest: CommentRequest) {
    try {
        const response = await api.post(`/comment`, commentRequest, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteComment(commentId: string) {
    try {
        const response = await api.delete(`/comment/${commentId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateComment(commentId: string, commentRequest: CommentRequest) {
    try {
        const response = await api.patch(`/comment/${commentId}`, commentRequest, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
