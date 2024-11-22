export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl bg-white p-4 shadow-lg"
          >
            <div className="aspect-square rounded-lg bg-gray-200" />
            <div className="mt-4 space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-1/2 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
