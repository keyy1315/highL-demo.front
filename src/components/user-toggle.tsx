import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export default function UserToggle() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Avatar>
            <AvatarImage
              src="https://ddragon.leagueoflegends.com/cdn/15.6.1/img/profileicon/685.png"
              alt="User avatar"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href="/">Logout</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/write">Write</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
