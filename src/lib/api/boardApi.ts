import { Board } from "@/types/board/board";
import { BoardRequest } from "@/types/board/boardRequest";
import { api } from "./axios-instance";

// GET METHODS
export async function getBoards(
  category?: string,
  sort?: string,
  desc?: boolean
): Promise<Board[]> {
  if (!desc) desc = true;
  const response = await api.get<Board[]>(`/api/board`, {
    params: {
      ...(category && { category }),
      ...(sort && { sort }),
      ...(desc && { desc }),
    },
  });
  return response.data;
}

export async function getBoardByFollow(
  category?: string,
  sort?: string,
  desc?: boolean
): Promise<Board> {
  if (!desc) desc = true;
  try {
    const response = await api.get<Board>(`/api/board/follow`, {
      params: {
        ...(category && { category }),
        ...(sort && { sort }),
        ...(desc && { desc }),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Axios 에러!!!! :", error);
    throw error;
  }
}

export async function getBoard(id: string): Promise<Board> {
  const response = await api.get<Board>(`/api/board/${id}`);
  return response.data;
}

// PATCH METHODS
export async function likeBoard(id: string): Promise<number> {
  const response = await api.patch<Board>(`/api/board/like/${id}`);
  return response.status;
}

export async function updateBoard(
  id: string,
  file: File,
  boardRequest: BoardRequest
): Promise<number> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "dto",
    new Blob([JSON.stringify(boardRequest)], { type: "application/json" })
  );

  const response = await api.patch<Board>(`/api/board/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.status;
}

// POST METHODS
export async function setBoard(
  file: File,
  boardRequest: BoardRequest
): Promise<number> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "dto",
    new Blob([JSON.stringify(boardRequest)], { type: "application/json" })
  );

  const response = await api.post(`/api/board`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.status;
}

// DELETE METHODS
export async function deleteBoard(id: string): Promise<number> {
  const response = await api.delete<Board>(`/api/board/${id}`);
  return response.status;
}
