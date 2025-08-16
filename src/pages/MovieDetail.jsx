import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetail, getMovieCast } from "../services/movieApi";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const imageBase = import.meta.env.VITE_TMDB_IMAGE_URL;

  useEffect(() => {
    setLoading(true);
    Promise.all([getMovieDetail(id), getMovieCast(id)])
      .then(([detail, credits]) => {
        setMovie(detail);
        setCast(credits.cast || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!movie) return <div className="p-6">Movie not found.</div>;

  const poster = movie.poster_path
    ? `${imageBase}${movie.poster_path}`
    : `https://via.placeholder.com/500x750?text=No+Image`;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={poster}
          alt={movie.title}
          className="w-64 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <div className="mt-2 text-gray-600">
            <p>{movie.overview}</p>
            <p className="mt-2 text-gray-400">
              Release: {movie.release_date || "N/A"} • Runtime:{" "}
              {movie.runtime ? `${movie.runtime} min` : "N/A"}
            </p>
            <p className="mt-1 text-gray-400">
              Genres: {movie.genres?.map((g) => g.name).join(", ") || "N/A"}
            </p>
            <p className="mt-1 text-gray-400">
              Rating: ⭐ {movie.vote_average?.toFixed?.(1) ?? "0.0"}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-3">Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {cast.slice(0, 12).map((c) => {
          const profile = c.profile_path
            ? `${imageBase}${c.profile_path}`
            : `https://via.placeholder.com/300x450?text=No+Image`;
          return (
            <div
              key={`${c.cast_id}-${c.credit_id}`}
              className="bg-gray-900 rounded-lg overflow-hidden"
            >
              <img
                src={profile}
                alt={c.name}
                className="w-full h-60 object-cover"
                loading="lazy"
              />
              <div className="p-2 text-sm">
                <p className="font-medium">{c.name}</p>
                <p className="text-gray-400">as {c.character || "—"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
