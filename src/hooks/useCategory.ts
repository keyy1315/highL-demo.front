import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api/categoryApi";
import { Category } from "@/types/category";
import { useAuthStore } from "@/stores/useAuthStore";

export const defaultCategories: Category[] = [
  {
    id: "00000000-0000-0000-0000-000000000002",
    name: "VOTE",
    description: "투표 영상 모아보기",
    createdDate: new Date(),
    updatedDate: new Date(),
  },
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "TFT",
    description: "롤토체스 영상 모아보기",
    createdDate: new Date(),
    updatedDate: new Date(),
  },

  {
    id: "00000000-0000-0000-0000-000000000000",
    name: "HIGHLIGHTS",
    description: "하이라이트 영상 모아보기",
    createdDate: new Date(),
    updatedDate: new Date(),
  },
];

export function useCategory() {
  const { isLoggedIn } = useAuthStore();
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    enabled: isLoggedIn,
  });
  const allCategories = categories ? categories : defaultCategories;

  return { categories: allCategories as Category[] };
}
