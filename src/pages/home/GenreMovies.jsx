import { useParams } from "react-router-dom";
import Nav from "../../components/home/Nav";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import MovieCard from "../../components/home/MovieCard";
import { useSearchMoviesQuery } from "../../features/movie/movieService";
import { useGetGenresQuery } from "../../features/genre/genresService";

const GenreMovies = () => {
  const { id, page: pageParam } = useParams();
  const page = pageParam ? parseInt(pageParam) : 1;
  const size = 12;
  const { data, isFetching } = useSearchMoviesQuery({ genreIds: [Number(id)], page: page - 1, size, sortBy: 'id', sortDir: 'desc' });
  const { data: genresData } = useGetGenresQuery();
  
  const result = data?.result;
  const items = result?.items || [];
  const total = result?.totalElements || 0;
  const genres = genresData?.result || [];
  const currentGenre = genres.find(g => g.id === Number(id));

  return (
    <>
      <Nav />
      <div className="mt-[100px] pb-16 bg-gray-50 min-h-screen">
        <div className="container">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 relative">
              {currentGenre?.name || `Genre #${id}`}
              <div className="absolute -bottom-2 left-0 w-16 h-1 netflix-gradient"></div>
            </h1>
            <p className="text-gray-600">
              {total} movie{total !== 1 ? 's' : ''} found {currentGenre?.name && `in ${currentGenre.name}`}
            </p>
          </div>

          {/* Loading State */}
          {isFetching && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <Spinner />
                <p className="text-gray-500 mt-4">Loading movies...</p>
              </div>
            </div>
          )}

          {/* Content */}
          {!isFetching && (
            <>
              {/* Empty State */}
              {items.length === 0 && (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <div className="text-gray-400 text-6xl mb-6">🎬</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-3">No movies found</h3>
                  <p className="text-gray-500">
                    {currentGenre?.name 
                      ? `There are no movies available in the ${currentGenre.name} genre yet.`
                      : `No movies found for this genre.`
                    }
                  </p>
                </div>
              )}

              {/* Movies Grid */}
              {items.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
                  {items.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {total > size && (
                <div className="mt-12 flex justify-center">
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <Pagination page={page} perPage={size} count={total} path={`genre/${id}`} />
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

export default GenreMovies;



