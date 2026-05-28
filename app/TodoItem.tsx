"use client";

import { useState } from "react";

interface Todo {
  id: string;
  title: string;
  complete?: boolean;
  createdAt?: string;
}

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(todo.complete || false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this todo?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");
      window.location.reload();
    } catch (error) {
      alert("Failed to delete todo");
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editTitle.trim()) {
      alert("Title cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle.trim() }),
      });

      if (!response.ok) throw new Error("Failed to update");
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      alert("Failed to update todo");
      setLoading(false);
    }
  };

  const handleToggleComplete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ complete: !completed }),
      });

      if (!response.ok) throw new Error("Failed to update");
      setCompleted(!completed);
    } catch (error) {
      alert("Failed to update todo status");
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = todo.createdAt
    ? new Date(todo.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition">
      <div className="px-4 py-4 flex items-center justify-between hover:bg-zinc-800/50 transition gap-3">
        <button
          onClick={handleToggleComplete}
          disabled={loading}
          className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition ${
            completed
              ? "bg-green-900/30 border-green-600"
              : "border-zinc-700 hover:border-zinc-500"
          }`}
        >
          {completed && (
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-2 py-1 bg-zinc-800 border border-zinc-700 rounded text-zinc-100 focus:outline-none focus:border-zinc-500"
              autoFocus
            />
          ) : (
            <>
              <p className={`font-medium truncate ${completed ? "line-through text-zinc-500" : "text-zinc-100"}`}>
                {todo.title}
              </p>
              <p className="text-zinc-500 text-sm mt-1">{formattedDate}</p>
            </>
          )}
        </div>

        <div className="flex gap-2 flex-shrink-0">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-3 py-1 text-sm bg-green-900/30 text-green-400 hover:bg-green-900/50 rounded transition disabled:opacity-50"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditTitle(todo.title);
                }}
                disabled={loading}
                className="px-3 py-1 text-sm bg-zinc-800 text-zinc-400 hover:bg-zinc-700 rounded transition disabled:opacity-50"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                disabled={loading}
                className="px-3 py-1 text-sm bg-zinc-800 text-zinc-400 hover:bg-zinc-700 rounded transition disabled:opacity-50"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-3 py-1 text-sm bg-red-900/30 text-red-400 hover:bg-red-900/50 rounded transition disabled:opacity-50"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
