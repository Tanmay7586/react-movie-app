import { IMAGE_BASE_SMALL } from "../services/movieApi";
import { Link } from "react-router-dom";


export default function MovieCard({ movie }) {
  const poster = movie.poster_path
    ? `${IMAGE_BASE_SMALL}${movie.poster_path}`
    : `https://via.placeholder.com/300x450?text=No+Image`;

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition hover:-translate-y-0.5">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={poster}
          alt={movie.title}
          className="w-full h-80 object-cover"
          loading="lazy"
        />
        <div className="p-3">
          <h3 className="text-base font-semibold line-clamp-2">
            {movie.title}
          </h3>
          <div className="text-xs text-gray-400 mt-1 flex items-center justify-between">
            <span>{movie.release_date || "N/A"}</span>
            <span className="rounded bg-gray-800 px-1.5 py-0.5">
              ⭐ {movie.vote_average?.toFixed?.(1) ?? "0.0"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
