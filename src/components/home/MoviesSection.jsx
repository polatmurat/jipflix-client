import { useMemo } from "react";
import { useSearchMoviesQuery } from "../../features/movie/movieService";
import MovieCard from "./MovieCard";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const MoviesSection = () => {
  // Simple params for showing 40 latest movies
  const params = useMemo(() => ({
    page: 0,
    size: 40,
    sortBy: "id",
    sortDir: "desc",
  }), []);
  
  const { data, isFetching } = useSearchMoviesQuery(params);
  const items = data?.result?.items || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800 relative">
          Movies
          <div className="absolute -bottom-2 left-0 w-16 h-1 netflix-gradient"></div>
        </h2>
      </div>
      
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
            {items.map(m => <MovieCard key={m.id} movie={m} />)}
          </div>
          
          <div className="flex justify-center">
            <Link 
              to="/movies" 
              className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all duration-200"
            >
              <span>See all movies</span>
              <svg 
                className="w-4 h-4 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MoviesSection;


