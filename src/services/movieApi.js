const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

// ✅ Add these lines
export const IMAGE_BASE_SMALL = "https://image.tmdb.org/t/p/w300";
export const IMAGE_BASE_LARGE = "https://image.tmdb.org/t/p/w500";

const common = `&api_key=${API_KEY}&language=en-US`;

export const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed: ${res.status} ${text}`);
  }
  return res.json();
};

export const getPopular = (page = 1) =>
  fetchJson(`${BASE_URL}/movie/popular?page=${page}${common}`);
export const getTopRated = (page = 1) =>
  fetchJson(`${BASE_URL}/movie/top_rated?page=${page}${common}`);
export const getUpcoming = (page = 1) =>
  fetchJson(`${BASE_URL}/movie/upcoming?page=${page}${common}`);
export const getMovieDetail = (id) =>
  fetchJson(`${BASE_URL}/movie/${id}?${common.slice(1)}`);
export const getMovieCast = (id) =>
  fetchJson(`${BASE_URL}/movie/${id}/credits?${common.slice(1)}`);
export const searchMovies = (query, page = 1) =>
  fetchJson(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(
      query
    )}&page=${page}${common}`
  );
