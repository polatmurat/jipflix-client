import { useSelector } from "react-redux";
import MovieStrip from "./MovieStrip";
import { useRecommendedQuery } from "../../features/list/listService";

const Recommended = () => {
  const { userToken } = useSelector((s) => s.authReducer);
  const { data, isFetching } = useRecommendedQuery({ page: 0, size: 18, sortBy: 'id', sortDir: 'desc' }, { skip: !userToken });
  if (!userToken) return null;
  const items = data?.result?.items || [];
  return (
    <MovieStrip title="Recommended for you" items={items} isLoading={isFetching} />
  );
};

export default Recommended;


