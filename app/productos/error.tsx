'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold text-red-600">
        Algo salió mal al cargar los productos
      </h2>
      <button
        onClick={reset}
        className="rounded bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
      >
        Intentar nuevamente
      </button>
    </div>
  );
}
