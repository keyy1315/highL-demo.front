import BoardWrite from "@/components/board/write/boardWrite";

export default function WritePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto w-full max-w-7xl md:px-3 py-8">
        <div className="mb-8 ml-2">
          <h1 className="text-3xl font-bold">Write New Post</h1>
          <p className="text-muted-foreground">Share your Highlights In Game</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BoardWrite />
        </div>
      </main>
    </div>
  );
}
