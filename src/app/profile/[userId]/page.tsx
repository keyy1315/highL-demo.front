
import MemberDetails from "@/components/profile/memberDetails";
import MemberBoards from "@/components/profile/memberBoards";

export default function MemberPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto w-full max-w-7xl md:px-3 py-8">
        <MemberDetails />
        <MemberBoards />
      </main>
    </div>
  );
}
