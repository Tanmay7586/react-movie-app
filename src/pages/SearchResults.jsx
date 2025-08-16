import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

export default function SearchResults() {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(true);
      searchMovies(query, page)
        .then((data) => {
          setMovies(data.results || []);
          setTotalPages(data.total_pages);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }, 400); // 400ms debounce

    return () => clearTimeout(delay);
  }, [query, page]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Results for “{query}”</h1>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 rounded-xl h-80 animate-pulse"
            />
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div>No results found.</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map((m) => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            setPage={setPage}
            totalPages={Math.min(totalPages ?? 500, 500)}
          />
        </>
      )}
    </div>
  );
}
