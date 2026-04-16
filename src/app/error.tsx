'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md glass rounded-3xl p-8">
        <span className="text-5xl block mb-4">⚠️</span>
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-sm text-dark-400 mb-6">{error.message || 'An unexpected error occurred.'}</p>
        <button onClick={reset} className="btn-primary cursor-pointer">
          Try again
        </button>
      </div>
    </div>
  );
}
