export default function Pagination({ currentPage, setPage, totalPages }) {
  const canPrev = currentPage > 1;
  const canNext = totalPages ? currentPage < totalPages : true;

  return (
    <div className="flex justify-center items-center gap-3 my-8">
      <button
        disabled={!canPrev}
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="bg-gray-800 px-4 py-2 rounded disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-sm text-gray-400">
        Page <b>{currentPage}</b>
        {totalPages ? ` / ${totalPages}` : ""}
      </span>

      <button
        disabled={!canNext}
        onClick={() => setPage((p) => p + 1)}
        className="bg-gray-800 px-4 py-2 rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
