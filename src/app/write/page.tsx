import BoardForm from "@/components/board/write/board-form";
import BoardSideForm from "@/components/board/write/board-side-form";
import Header from "@/components/header/header";

export default function WritePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-7xl py-8">
        <div className="mb-8 ml-2">
          <h1 className="text-3xl font-bold">Write New Post</h1>
          <p className="text-muted-foreground">Share your Highlights In Game</p>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
            <BoardForm />
            <BoardSideForm />
        </div>
      </main>
    </div>
  );
}
