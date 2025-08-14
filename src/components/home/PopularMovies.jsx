import { useListMoviesQuery } from "../../features/movie/movieService";
import MovieStrip from "./MovieStrip";

const PopularMovies = () => {
  const { data, isFetching } = useListMoviesQuery({ page: 0, size: 18, sortBy: 'rating', sortDir: 'desc' });
  const items = data?.result?.items || [];
  return (
    <MovieStrip title="Top Rated Movies" items={items} isLoading={isFetching} />
  );
};

export default PopularMovies;
