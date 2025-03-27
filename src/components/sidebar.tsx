import Link from "next/link";

interface SidebarProps {
  currentparam?: string;
}

export default function Sidebar({ currentparam }: SidebarProps) {
  const topics = [{
    id: "1",
    name: "Mastery",
  },
  {
    id: "2",
    name: "Issues",
  },
  {
    id: "3",
    name: "Am I Wrong?",
  }];

  return (
    <aside className="hidden space-y-6 md:block">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Trending Topics</h2>
        <div className="space-y-2">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/topic/${topic.id}`}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors ${
                currentparam === topic.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted"
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  currentparam === topic.id ? "bg-primary" : "bg-primary/60"
                }`}
              ></div>
              <span>{topic.name}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Suggested Creators</h2>
        <div className="space-y-4">
          {[
            { name: "Alex Kim", followers: "1.2M" },
            { name: "Jessica Park", followers: "845K" },
            { name: "David Lee", followers: "623K" },
          ].map((creator) => (
            <Link
              key={creator.name}
              href={`/user/${creator.name.toLowerCase()}`}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors ${
                currentparam === creator.name
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted"
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  currentparam === creator.name ? "bg-primary" : "bg-primary/60"
                }`}
              ></div>
              <span>{creator.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
