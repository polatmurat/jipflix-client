import { useState, useEffect } from 'react';
import { BsX, BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSearchMoviesQuery } from "../../features/movie/movieService";
import PropTypes from 'prop-types';

const MovieSearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isFetching } = useSearchMoviesQuery(
    {
      title: debouncedTerm,
      page: 0,
      size: 8,
      sortBy: 'rating',
      sortDir: 'desc'
    },
    { skip: !debouncedTerm || debouncedTerm.length < 2 }
  );

  const movies = data?.result?.items || [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchTerm('');
      setDebouncedTerm('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-start justify-center pt-20">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[70vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Search Movies</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <BsX size={24} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
              placeholder="Search for movies..."
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {!debouncedTerm && (
            <div className="p-8 text-center text-gray-500">
              <BsSearch size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">Search for movies</p>
              <p className="text-sm">Type at least 2 characters to start searching</p>
            </div>
          )}

          {debouncedTerm && debouncedTerm.length < 2 && (
            <div className="p-8 text-center text-gray-500">
              <p>Please enter at least 2 characters</p>
            </div>
          )}

          {debouncedTerm && debouncedTerm.length >= 2 && (
            <>
              {isFetching && (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Searching movies...</p>
                </div>
              )}

              {!isFetching && movies.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <p className="text-lg font-medium mb-2">No movies found</p>
                  <p className="text-sm">Try searching with different keywords</p>
                </div>
              )}

              {!isFetching && movies.length > 0 && (
                <div className="p-4">
                  <div className="space-y-3">
                    {movies.map((movie) => (
                      <Link
                        key={movie.id}
                        to={`/movie/${movie.id}`}
                        onClick={onClose}
                        className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
                      >
                        <div className="w-16 h-20 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                          {movie.imageUrl ? (
                            <img
                              src={movie.imageUrl}
                              alt={movie.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center">
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-200 truncate">
                            {movie.title}
                          </h3>
                          <p className="text-sm text-gray-500 truncate mt-1">
                            {movie.description || 'No description available'}
                          </p>
                          {movie.rating && (
                            <div className="flex items-center mt-2">
                              <span className="text-yellow-500 mr-1">★</span>
                              <span className="text-sm font-medium text-gray-600">{movie.rating}</span>
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  {movies.length >= 8 && (
                    <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                      <Link
                        to="/movies"
                        onClick={onClose}
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        <BsSearch className="mr-2" size={16} />
                        View all results
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

MovieSearchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MovieSearchModal;

