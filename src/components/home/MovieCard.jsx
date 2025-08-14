import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl relative text-white group cursor-pointer transition-all duration-200 hover:shadow-lg">
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
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};

export default MovieCard;


