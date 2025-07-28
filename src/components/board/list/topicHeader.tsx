import { useCategory } from "@/hooks/useCategory";

interface TopicHeaderProps {
  categoryName: string;
}

export default function TopicHeader({ categoryName }: TopicHeaderProps) {
  const { categories } = useCategory();
  return (
    <div className="space-y-2 mb-10">
      <h1 className="text-3xl font-bold tracking-tight">
        {categories.find((category) => category.name === categoryName)?.name}
      </h1>
    </div>
  );
}
