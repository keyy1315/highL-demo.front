import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Notifications } from "./notifications";
import Link from "next/link";

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
          <span className="text-xl font-bold">VideoHub</span>
        </Link>
        <div className="flex items-center gap-4">
          <Notifications />
          <ModeToggle />
          <div className="relative h-8 w-8 overflow-hidden rounded-full ml-2">
            <Avatar>
              <AvatarImage
                src="https://ddragon.leagueoflegends.com/cdn/15.6.1/img/profileicon/685.png"
                alt="User avatar"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
