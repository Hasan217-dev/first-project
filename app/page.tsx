import { Metadata } from "next";
import TodoContainer from "./TodoContainer";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Simple todo management app",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <TodoContainer />
      </div>
    </main>
  );
}
