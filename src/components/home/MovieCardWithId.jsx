import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useGetMovieQuery } from "../../features/movie/movieService";
import Skeleton from "../skeleton/Skeleton";
import Thumbnail from "../skeleton/Thumbnail";

const MovieCardWithId = ({ movieId }) => {
  const { data: movieResp, isLoading, error } = useGetMovieQuery(movieId);
  const movie = movieResp?.result;

  if (isLoading) {
    return (
      <div className="w-full">
        <Skeleton>
          <Thumbnail />
        </Skeleton>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="w-full h-[200px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="text-2xl mb-2">🎬</div>
          <div className="text-sm">Movie not found</div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/movie/${movie.id}`} className="w-full overflow-hidden rounded-xl relative text-white group cursor-pointer transition-all duration-200 hover:shadow-lg">
      <div className="relative w-full h-[200px]">
        <div className="w-full h-full rounded-xl overflow-hidden absolute inset-0 shadow-lg">
          {movie.imageUrl ? (
            <img
              src={movie.imageUrl}
              className="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-200 group-hover:scale-105"
              alt={movie.title}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center text-gray-600 font-medium">
              {movie.title}
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-85 transition-opacity duration-200"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <div className="flex items-center justify-between">
            <Link to={`/movie/${movie.id}`} className="text-white text-sm font-semibold truncate pr-2 group-hover:text-indigo-300 transition-colors duration-200">
              {movie.title}
            </Link>
            {movie.rating != null && (
              <div className="flex items-center space-x-1 bg-yellow-500/20 px-2 py-1 rounded-full backdrop-blur-sm">
                <span className="text-yellow-300 text-xs">★</span>
                <span className="text-yellow-300 text-xs font-semibold">{movie.rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

MovieCardWithId.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default MovieCardWithId;
