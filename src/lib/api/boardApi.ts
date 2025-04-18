import { Board } from "@/types/board";
import { BoardRequest } from "@/types/board";
import { api } from "./axios-instance";

// GET METHODS
export async function getBoards(
  category?: string | null,
  sort?: string | null,
  desc?: boolean | null
): Promise<Board[]> {
  if (!desc) desc = true;
  try {
    const response = await api.get<Board[]>(`/board`, {
      params: {
        ...(category && { category }),
        ...(sort && { sort }),
        ...(desc && { desc }),
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getBoardByFollow(
  category?: string | null,
  sort?: string | null,
  desc?: boolean | null
): Promise<Board[]> {
  if (!desc) desc = true;
  try {
    const response = await api.get<Board[]>(`/board/follow`, {
      params: {
        ...(category && { category }),
        ...(sort && { sort }),
        ...(desc && { desc }),
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getBoard(id: string): Promise<Board> {
  try {
    const response = await api.get<Board>(`/board/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

// PATCH METHODS
export async function likeBoard(id: string): Promise<number> {
  const response = await api.patch<Board>(`/board/like/${id}`);
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

  const response = await api.patch<Board>(`/board/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return response.status;
}

// POST METHODS
export async function setBoard(
  file: File | null,
  boardRequest: BoardRequest
): Promise<number> {
  const formData = new FormData();
  if (file) {
    formData.append("file", file);
  }
  formData.append(
    "dto",
    new Blob([JSON.stringify(boardRequest)], { type: "application/json" })
  );
  const response = await api.post('http://localhost:8081/api/board', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
    return response.status;
}

// DELETE METHODS
export async function deleteBoard(id: string): Promise<number> {
  const response = await api.delete<Board>(`/board/${id}`, {
    withCredentials: true,
  });
  return response.status;
}
