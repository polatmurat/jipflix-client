import { useListWatchQuery, useListFavoriteQuery } from "../../features/list/listService";
import MovieCard from "./MovieCard";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const ListGrid = ({ title, items, isLoading }) => (
  <div className="mt-12">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-bold text-gray-700 relative">
        {title}
        <div className="absolute -bottom-1 left-0 w-12 h-0.5 netflix-gradient"></div>
      </h3>
    </div>
    {isLoading ? (
      <Spinner />
    ) : items.length > 0 ? (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">
        {items.map((i) => (
          <MovieCard key={`${title}-${i.id}-${i.movieId}`} movie={{ id: i.movieId, title: `Movie #${i.movieId}`, imageUrl: null, rating: null }} />
        ))}
      </div>
    ) : (
      <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-200">
        <div className="text-gray-400 text-4xl mb-4">🎬</div>
        <p className="text-gray-500 font-medium">No movies in your {title.toLowerCase()} list yet</p>
        <p className="text-gray-400 text-sm mt-2">Start adding movies to see them here!</p>
      </div>
    )}
  </div>
);

ListGrid.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const MyLists = () => {
  const { data: wData, isFetching: wLoading } = useListWatchQuery({ page: 0, size: 12 });
  const { data: fData, isFetching: fLoading } = useListFavoriteQuery({ page: 0, size: 12 });
  const watchItems = wData?.result?.items || [];
  const favItems = fData?.result?.items || [];
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800 relative">
          My Lists
          <div className="absolute -bottom-2 left-0 w-16 h-1 netflix-gradient"></div>
        </h2>
        <Link 
          to="/user" 
          className="inline-flex items-center px-6 py-2 bg-gray-800 text-white font-medium rounded-lg shadow-md hover:bg-gray-900 hover:shadow-lg transition-all duration-200 text-sm"
        >
          <span>Go to dashboard</span>
          <svg 
            className="w-4 h-4 ml-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <ListGrid title="Watch" items={watchItems} isLoading={wLoading} />
      <ListGrid title="Favorite" items={favItems} isLoading={fLoading} />
    </div>
  );
};

export default MyLists;


