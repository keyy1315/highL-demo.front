import { api } from "./axios-instance";
import {Comment, CommentRequest} from "@/types/comment";

export async function getComments(boardId: string) {
    try {
        const response = await api.get(`/api/comment/${boardId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function createComment(boardId: string, commentRequest: CommentRequest) {
    try {
        const response = await api.post(`/api/comment/${boardId}`, commentRequest, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteComment(commentId: string) {
    try {
        const response = await api.delete(`/api/comment/${commentId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateComment(commentId: string, commentRequest: CommentRequest) {
    try {
        const response = await api.patch(`/api/comment/${commentId}`, commentRequest, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
