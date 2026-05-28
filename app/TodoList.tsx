import { prisma } from "@/lib/db";
import TodoItem from "./TodoItem";

async function fetchTodos() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/todos`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

export default async function TodoList() {
  const todos = await fetchTodos();

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-zinc-400 text-lg">No todos yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo: any) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
