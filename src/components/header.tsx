import { ModeToggle } from "./mode-toggle";
import { Notifications } from "./notifications";
import Link from "next/link";
import UserToggle from "./user-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m9 8 6 4-6 4Z" />
          </svg>
          <span className="text-xl font-bold">HighLighter</span>
        </Link>
        <div className="flex items-center gap-4">
          <Notifications />
          <ModeToggle />
          <div className="relative h-8 w-8 overflow-hidden rounded-full ml-1">
            <UserToggle />  
          </div>
        </div>
      </div>
    </header>
  );
}
