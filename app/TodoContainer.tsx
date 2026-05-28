import { Suspense } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import TodoSkeleton from "./TodoSkeleton";

export default function TodoContainer() {
  return (
    <div className="space-y-6">
      {/* Add Todo Form */}
      <AddTodoForm />

      {/* Todo List with Suspense */}
      <Suspense fallback={<TodoSkeleton />}>
        <TodoList />
      </Suspense>
    </div>
  );
}
