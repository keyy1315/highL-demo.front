import { getAuth } from "@/lib/api/loginApi";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: auth, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: () => getAuth(),
  });

  return { auth, isLoading };
}
