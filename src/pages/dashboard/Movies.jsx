import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Wrapper from "./Wrapper";
import { BsPlusLg } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { clearMessage } from "../../app/reducers/globalReducer";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import { useListMoviesQuery, useDeleteMovieMutation, useSearchMoviesQuery } from "../../features/movie/movieService";

const Movies = () => {
  let { page } = useParams();
  const currentPage = page ? parseInt(page) : 1;
  const [query, setQuery] = useState("");
  const { data, isFetching, refetch } = useListMoviesQuery({ page: currentPage - 1, size: 12 }, { skip: !!query });
  const { data: searchData, isFetching: searching } = useSearchMoviesQuery(
    { title: query, page: currentPage - 1, size: 12 },
    { skip: !query }
  );
  const dispatch = useDispatch();
  const [deleteMovie] = useDeleteMovieMutation();

  useEffect(() => {
    return () => { dispatch(clearMessage()); };
  }, [dispatch]);

  const pageData = query ? searchData?.result : data?.result;
  const items = pageData?.items || [];
  const totalElements = pageData?.totalElements || 0;
  const size = pageData?.size || 12;

  const onDelete = async (id) => {
    if (window.confirm("Are you sure to delete this movie?")) {
      await deleteMovie(id);
      refetch();
    }
  };

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/create-movie" className="btn-dark inline-flex items-center">
          <BsPlusLg className="mr-2" />
          Add Movie
        </Link>
      </ScreenHeader>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control w-full md:w-4/12"
          placeholder="Search by title..."
        />
      </div>
      {(isFetching || searching) && <Spinner />}
      {!isFetching && !searching && (
        <>
          {items.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {items.map((movie) => (
                  <div key={movie.id} className="relative group">
                    {/* MovieCard Style Design */}
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
                            <Link to={`/movie/${movie.id}`} target="_blank" className="text-white text-sm font-semibold truncate pr-2 group-hover:text-indigo-300 transition-colors duration-200">
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
                    
                    {/* Admin Actions - Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
                      <div className="flex space-x-2">
                        <Link 
                          to={`/dashboard/update-movie/${movie.id}`}
                          className="px-3 py-2 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                        >
                          Edit
                        </Link>
                        <Link 
                          to={`/movie/${movie.id}`}
                          target="_blank"
                          className="px-3 py-2 bg-gray-600 text-white text-xs rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        >
                          View
                        </Link>
                        <button 
                          onClick={() => onDelete(movie.id)}
                          className="px-3 py-2 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Pagination page={currentPage} perPage={size} count={totalElements} path="dashboard/movies" />
              </div>
            </>
          ) : (
            <p>There are no movies.</p>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Movies;


