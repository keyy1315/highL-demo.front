import { CommentRequest } from "@/types/comment";
import axios from "axios";

export async function getComments(boardId: string, sort?: string, desc?: boolean) {
    if (!desc) desc = true;
    if (!sort) sort = "createdDate";
    try {
        const response = await axios.get(`/api/comment/${boardId}`, {
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
        const response = await axios.post(`/api/comment`, commentRequest, {
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
        const response = await axios.delete(`/api/comment/${commentId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function updateComment(commentId: string, commentRequest: CommentRequest) {
    try {
        const response = await axios.patch(`/api/comment/${commentId}`, commentRequest, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
