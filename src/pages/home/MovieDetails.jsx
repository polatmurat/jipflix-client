import Nav from "../../components/home/Nav";
import { useParams } from "react-router-dom";
import { useGetMovieQuery, useListCommentsQuery, useAddCommentMutation, useRateMovieMutation, useRecommendByGenresQuery } from "../../features/movie/movieService";
import { useGetGenresQuery } from "../../features/genre/genresService";
import Spinner from "../../components/Spinner";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddToListButtons from "../../components/home/AddToListButtons";

const MovieDetails = () => {
  const { id } = useParams();
  const { data: movieResp, isFetching } = useGetMovieQuery(id);
  const movie = movieResp?.result;
  const { data: commentsResp, refetch } = useListCommentsQuery(id);
  const comments = commentsResp?.result || [];
  const [text, setText] = useState("");
  const [addComment] = useAddCommentMutation();
  const [rateMovie] = useRateMovieMutation();
  const { userToken } = useSelector((s) => s.authReducer);

  const { data: recResp, isFetching: recLoading } = useRecommendByGenresQuery(
    { preferredGenreIds: [], page: 0, size: 8, sortBy: 'id', sortDir: 'desc' },
    { skip: !userToken }
  );
  const recItems = recResp?.result?.items || [];

  const { data: allGenresResp } = useGetGenresQuery();
  const allGenres = allGenresResp?.result || [];
  const movieGenreNames = movie?.genres || [];
  const genreIds = movieGenreNames
    .map((name) => {
      const g = allGenres.find((x) => String(x.name).toLowerCase() === String(name).toLowerCase());
      return g ? g.id : null;
    })
    .filter((v) => v != null);

  const { data: similarByGenresResp, isFetching: similarLoading } = useRecommendByGenresQuery(
    { preferredGenreIds: genreIds, page: 0, size: 6, sortBy: 'id', sortDir: 'desc' },
    { skip: !genreIds || genreIds.length === 0 }
  );
  const similarItems = (similarByGenresResp?.result?.items || []).filter(m => String(m.id) !== String(id));

  const submitComment = async (e) => {
    e.preventDefault();
    await addComment({ movieId: id, body: { text } });
    setText("");
    refetch();
  };

  const onRate = async (score) => {
    await rateMovie({ movieId: id, score });
  };

  return (
    <>
      <Nav />
      <div className="mt-[100px] pb-[80px] container">
        {isFetching && <Spinner />}
        {!isFetching && movie && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              {movie.imageUrl ? (
                <img src={movie.imageUrl} alt={movie.title} className="w-full rounded-xl shadow-lg" />
              ) : (
                <div className="w-full h-[400px] bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl flex items-center justify-center text-gray-500 font-medium">
                  {movie.title}
                </div>
              )}
            </div>
            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-3">{movie.title}</h1>
                <div className="text-sm text-gray-500 mb-2">Release Year: {movie.releaseYear ?? '-'}</div>
                <p className="text-gray-700 leading-relaxed">{movie.description}</p>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-800">Rate this movie</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xl font-bold text-indigo-600">{movie.rating ?? '-'}</span>
                    <span className="text-sm text-gray-500">/10</span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {[1,2,3,4,5,6,7,8,9,10].map(s => (
                    <button 
                      key={s} 
                      className="group relative hover:scale-105 transition-transform duration-200" 
                      onClick={() => onRate(s)}
                    >
                      <svg 
                        className="w-5 h-5 text-gray-300 group-hover:text-yellow-400 transition-colors duration-200" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {s}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {(movie.genres || []).map(g => (
                      <span key={g} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">{g}</span>
                    ))}
                  </div>
                </div>
                <div className="lg:flex-shrink-0">
                  <h3 className="font-semibold text-gray-800 mb-3">Add to Lists</h3>
                  <AddToListButtons movieId={id} />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Comments</h3>
                <div className="space-y-3 mb-4">
                  {comments.map(c => (
                    <div key={c.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="text-xs text-gray-500 mb-2">{new Date(c.createdAt).toLocaleString()}</div>
                      <div className="text-gray-700">{c.text}</div>
                    </div>
                  ))}
                </div>
                <form onSubmit={submitComment} className="space-y-3">
                  <input 
                    type="text" 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" 
                    placeholder="Write a comment..." 
                  />
                  <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        {!isFetching && (
          <>
            {userToken && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 relative">
                  Recommended for you
                  <div className="absolute -bottom-2 left-0 w-16 h-1 netflix-gradient"></div>
                </h2>
                {recLoading && <Spinner />}
                {!recLoading && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {recItems.map(r => (
                      <a key={r.id} href={`/movie/${r.id}`} className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden group">
                        {r.imageUrl ? (
                          <img src={r.imageUrl} alt={r.title} className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-200" />
                        ) : (
                          <div className="w-full h-[200px] bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center text-gray-500" />
                        )}
                        <div className="p-4">
                          <div className="text-sm font-semibold text-gray-800 truncate">{r.title}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 relative">
                Similar movies
                <div className="absolute -bottom-2 left-0 w-16 h-1 netflix-gradient"></div>
              </h2>
              {similarLoading && <Spinner />}
              {!similarLoading && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {similarItems.slice(0, 6).map(s => (
                    <a key={s.id} href={`/movie/${s.id}`} className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 overflow-hidden group">
                      {s.imageUrl ? (
                        <img src={s.imageUrl} alt={s.title} className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-200" />
                      ) : (
                        <div className="w-full h-[200px] bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center text-gray-500" />
                      )}
                      <div className="p-4">
                        <div className="text-sm font-semibold text-gray-800 truncate">{s.title}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MovieDetails;


