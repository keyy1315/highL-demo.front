"use client";

import { useSidebarStore } from "@/stores/useSidebarStore";
import { Package, Plus, ShieldHalf, Sparkles, Vote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCategory } from "@/hooks/useCategory";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Sidebar() {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const setOpen = useSidebarStore((state) => state.setOpen);
  const { categories } = useCategory();
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  const handleOverlayClick = () => {
    setOpen(false);
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/board?category=${categoryId}`);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed top-16 left-0 right-0 bottom-0 z-40 bg-black/50 transition-opacity duration-200 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleOverlayClick}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-78 transform bg-background p-4 transition-all duration-200 ease-in-out md:relative md:top-0 md:translate-x-0 ${
          isOpen ? "translate-x-0 z-50" : "-translate-x-full z-0"
        }`}
      >
        <div className="space-y-6 w-full">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-lg border bg-card p-4 shadow-sm cursor-pointer hover:bg-accent"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="space-y-2">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  {category.name === "TFT" && (
                    <ShieldHalf className="w-4 h-4" />
                  )}
                  {category.name === "HIGHLIGHTS" && (
                    <Sparkles className="w-4 h-4" />
                  )}
                  {category.name === "VOTE" && <Vote className="w-4 h-4" />}
                  {!["TFT", "HIGHLIGHTS", "VOTE"].includes(category.name) && (
                    <Package className="w-4 h-4" />
                  )}
                  {category.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
          {isLoggedIn && (
            <div
              className="rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/30 p-4 shadow-sm cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => {
                console.log("add category");
              }}
            >
              <div className="space-y-2">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-muted-foreground">
                  <Plus className="w-4 h-4" />
                  ADD CATEGORY
                </h2>
                <p className="text-sm text-muted-foreground">
                  카테고리 추가하기
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
