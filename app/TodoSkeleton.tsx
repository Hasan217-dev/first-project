export default function TodoSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="px-4 py-4 bg-zinc-900 border border-zinc-800 rounded-lg animate-pulse"
        >
          <div className="h-4 bg-zinc-800 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}
