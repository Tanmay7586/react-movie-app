import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // clear input on route change
    setQ("");
  }, [location.pathname]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/search/${q.trim()}`);
  };

  const linkBase =
    "px-3 py-1 rounded hover:bg-gray-800 transition-colors text-sm";

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Top row: logo */}
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            MovieApp
          </Link>
        </div>

        {/* Middle row: nav links */}
        <div className="flex flex-wrap gap-2">
          <Link className={linkBase} to="/">
            Popular
          </Link>
          <Link className={linkBase} to="/top-rated">
            Top Rated
          </Link>
          <Link className={linkBase} to="/upcoming">
            Upcoming
          </Link>
        </div>

        {/* Bottom row: search */}
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search movie..."
            className="flex-1 sm:w-64 px-3 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 ring-gray-700"
          />
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded font-medium"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
