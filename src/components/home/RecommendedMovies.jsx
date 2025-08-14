import { useGetPreferencesQuery } from "../../features/user/userService";
import { useRecommendByGenresQuery } from "../../features/movie/movieService";
import MovieStrip from "./MovieStrip";

const RecommendedMovies = () => {
  const { data: preferencesData, isLoading: preferencesLoading } = useGetPreferencesQuery();
  
  const preferredGenreIds = preferencesData?.result || [];
  
  const { data: recommendationsData, isFetching: recommendationsLoading } = useRecommendByGenresQuery(
    { 
      preferredGenreIds, 
      page: 0, 
      size: 18, 
      sortBy: 'rating', 
      sortDir: 'desc' 
    },
    { 
      skip: preferencesLoading || !preferredGenreIds || preferredGenreIds.length === 0 
    }
  );
  
  const recommendedItems = recommendationsData?.result?.items || [];
  
  if (!preferredGenreIds || preferredGenreIds.length === 0 || recommendedItems.length === 0) {
    return null;
  }
  
  return (
    <MovieStrip 
      title="Recommended For You" 
      items={recommendedItems} 
      isLoading={preferencesLoading || recommendationsLoading} 
    />
  );
};

export default RecommendedMovies;
