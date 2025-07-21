"use client";

import { Board } from "@/types/board";
import { BoardRequest } from "@/types/board";
import axios from "axios";
import { tryCatch } from "../utils";

// GET METHODS
export async function getBoards(
  category?: string | null,
  sort?: string | null,
  desc?: boolean | null
): Promise<Board[]> {
  return tryCatch(async () => {
    if (!desc) desc = true;
    const response = await axios.get<Board[]>(`/api/board`, {
      params: {
        ...(category && { category }),
        ...(sort && { sort }),
        ...(desc && { desc }),
      },
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  });
}

export async function getBoardByFollow(
  category?: string | null,
  sort?: string | null,
  desc?: boolean | null
): Promise<Board[]> {
  return tryCatch(async () => {
    if (!desc) desc = true;

    const response = await axios.get<Board[]>(`/api/board/follow`, {
      params: {
        ...(category && { category }),
        ...(sort && { sort }),
        ...(desc && { desc }),
      },
      withCredentials: true,
    });
    return response.data;
  });
}

export async function getBoard(id: string): Promise<Board> {
  return tryCatch(async () => {
    const response = await axios.get<Board>(`/api/board/${id}`, {
      withCredentials: true,
    });
    return response.data;
  });
}

// PATCH METHODS
export async function likeBoard(id: string): Promise<number> {
  return tryCatch(async () => {
    const response = await axios.patch<Board>(`/api/board/like/${id}`, {
      withCredentials: true,
    });
    return response.status;
  });
}

export async function updateBoard(
  id: string,
  file: File,
  boardRequest: BoardRequest
): Promise<number> {
  return tryCatch(async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "dto",
      new Blob([JSON.stringify(boardRequest)], { type: "application/json" })
    );

    const response = await axios.patch<Board>(`/api/board/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.status;
  });
}

// POST METHODS
export async function setBoard(
  file: File | null,
  boardRequest: BoardRequest
): Promise<number> {
  return tryCatch(async () => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    formData.append(
      "dto",
      new Blob([JSON.stringify(boardRequest)], { type: "application/json" })
    );
    const response = await axios.post("/api/board", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return response.status;
  });
}

export async function analyze(formData: FormData) {
  return tryCatch(async () => {
    const response = await axios.post("/api/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.score > 0.65) {
      return response.data;
    }
    return null;
  });
}

// DELETE METHODS
export async function deleteBoard(id: string): Promise<number> {
  return tryCatch(async () => {
    const response = await axios.delete<Board>(`/api/board/${id}`, {
      withCredentials: true,
    });
    return response.status;
  });
}
