import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { Member } from "@/types/member";
import { LogOut } from "lucide-react";

interface UserToggleProps {
  member: Member | null;
}

export default function UserToggle({ member }: UserToggleProps) {
  const { logout } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <Avatar>
            <AvatarImage src={member?.iconUrl ?? ""} alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={`/profile/${member?.id}`}>My Page</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout} className="text-red-500">
          <LogOut className="w-4 h-4 mr-2" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
