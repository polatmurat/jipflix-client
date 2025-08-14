import { useAddWatchMutation, useAddFavoriteMutation, useRemoveWatchMutation, useRemoveFavoriteMutation, useListWatchQuery, useListFavoriteQuery } from "../../features/list/listService";
import PropTypes from 'prop-types';

const AddToListButtons = ({ movieId }) => {
  const [addWatch, addWatchResp] = useAddWatchMutation();
  const [addFavorite, addFavoriteResp] = useAddFavoriteMutation();
  const [removeWatch, removeWatchResp] = useRemoveWatchMutation();
  const [removeFavorite, removeFavoriteResp] = useRemoveFavoriteMutation();
  
  // Check if movie is in lists
  const { data: watchData } = useListWatchQuery({ page: 0, size: 100 });
  const { data: favoriteData } = useListFavoriteQuery({ page: 0, size: 100 });
  
  const watchItems = watchData?.result?.items || [];
  const favoriteItems = favoriteData?.result?.items || [];
  
  const isInWatchList = watchItems.some(item => String(item.movieId) === String(movieId));
  const isInFavoriteList = favoriteItems.some(item => String(item.movieId) === String(movieId));

  const handleWatchClick = () => {
    if (isInWatchList) {
      removeWatch({ movieId });
    } else {
      addWatch({ movieId });
    }
  };

  const handleFavoriteClick = () => {
    if (isInFavoriteList) {
      removeFavorite({ movieId });
    } else {
      addFavorite({ movieId });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <button 
        className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium disabled:opacity-50 ${
          isInWatchList 
            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
            : 'bg-green-100 text-green-700 hover:bg-green-200'
        }`}
        disabled={addWatchResp.isLoading || removeWatchResp.isLoading} 
        onClick={handleWatchClick}
      >
        {isInWatchList ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )}
        <span>{isInWatchList ? 'In Watch List' : 'Add to Watch'}</span>
      </button>
      
      <button 
        className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors duration-200 text-sm font-medium disabled:opacity-50 ${
          isInFavoriteList 
            ? 'bg-red-200 text-red-800 hover:bg-red-300' 
            : 'bg-red-100 text-red-700 hover:bg-red-200'
        }`}
        disabled={addFavoriteResp.isLoading || removeFavoriteResp.isLoading} 
        onClick={handleFavoriteClick}
      >
        <svg className="w-4 h-4" fill={isInFavoriteList ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span>{isInFavoriteList ? 'Favorited' : 'Add to Favorites'}</span>
      </button>
    </div>
  );
};

AddToListButtons.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default AddToListButtons;


