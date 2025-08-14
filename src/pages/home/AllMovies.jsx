import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../components/home/Nav";
import MovieSearchHeader from "../../components/home/MovieSearchHeader";
import MovieCard from "../../components/home/MovieCard";
import Spinner from "../../components/skeleton/Spinner";
import Pagination from "../../components/skeleton/Pagination";
import { useSearchMoviesQuery } from "../../features/movie/movieService";

const AllMovies = () => {
  const { page: pageParam } = useParams();
  const page = pageParam ? parseInt(pageParam) : 1;
  const size = 24;

  const [state, setState] = useState({
    title: "",
    directorName: "",
    directorId: "",
    yearFrom: "",
    yearTo: "",
    minRating: "",
    maxRating: "",
    sortBy: "id",
    sortDir: "desc",
  });

  const params = useMemo(() => ({
    title: state.title || undefined,
    directorName: state.directorName || undefined,
    directorId: state.directorId ? Number(state.directorId) : undefined,
    yearFrom: state.yearFrom ? Number(state.yearFrom) : undefined,
    yearTo: state.yearTo ? Number(state.yearTo) : undefined,
    minRating: state.minRating ? Number(state.minRating) : undefined,
    maxRating: state.maxRating ? Number(state.maxRating) : undefined,
    page: page - 1,
    size,
    sortBy: state.sortBy,
    sortDir: state.sortDir,
  }), [state.title, state.directorName, state.directorId, state.yearFrom, state.yearTo, state.minRating, state.maxRating, state.sortBy, state.sortDir, page, size]);
  const { data, isFetching } = useSearchMoviesQuery(params);

  const items = data?.result?.items || [];
  const total = data?.result?.totalElements || 0;

  const onSearch = () => {
    // no-op: the hook re-fetches due to state change; navigation to page 1 can be handled by link if needed
  };

  return (
    <>
      <Nav />
      <div className="mt-[100px] pb-16 bg-gray-50 min-h-screen">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 relative">
              All Movies
              <div className="absolute -bottom-2 left-0 w-16 h-1 netflix-gradient"></div>
            </h1>
            <p className="text-gray-600">
              {total} movie{total !== 1 ? 's' : ''} available
            </p>
          </div>

          <MovieSearchHeader state={state} setState={setState} onSearch={onSearch} />

          {isFetching && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Spinner />
                <p className="text-gray-500 mt-4">Loading movies...</p>
              </div>
            </div>
          )}

          {!isFetching && (
            <>
              {items.length === 0 && (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <div className="text-gray-400 text-6xl mb-6">🎬</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-3">No movies found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search criteria to find more movies
                  </p>
                </div>
              )}

              {items.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {items.map((m) => (
                    <MovieCard key={m.id} movie={m} />
                  ))}
                </div>
              )}

              {total > size && (
                <div className="mt-12 flex justify-center">
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <Pagination page={page} perPage={size} count={total} path="movies" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AllMovies;


