import { useState, useEffect } from "react";
import Nav from "../../components/home/Nav";
import AccountList from "../../components/home/AccountList";
import MovieCard from "../../components/home/MovieCard";
import { useGetPreferencesQuery, useUpdatePreferencesMutation, useGetProfileQuery } from "../../features/user/userService";
import { useGetGenresQuery } from "../../features/genre/genresService";
import { useListWatchQuery, useListFavoriteQuery } from "../../features/list/listService";


const Dashboard = () => {
  const { data: profileResp, isLoading: profileLoading } = useGetProfileQuery();
  const { data: prefsResp, isLoading: prefsLoading, refetch } = useGetPreferencesQuery();
  const [updatePrefs] = useUpdatePreferencesMutation();
  const { data: genresResp, isLoading: genresLoading } = useGetGenresQuery();
  
  // Watch and Favorite lists
  const { data: watchResp, isLoading: watchLoading } = useListWatchQuery();
  const { data: favoriteResp, isLoading: favoriteLoading } = useListFavoriteQuery();
  
  const profile = profileResp?.result;
  const genres = genresResp?.result || [];
  
  // Local state for instant feedback
  const [selectedGenres, setSelectedGenres] = useState(new Set());
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Initialize selected genres when data loads
  useEffect(() => {
    const initialGenres = profile?.preferredGenreIds || prefsResp?.result || [];
    setSelectedGenres(new Set(initialGenres));
  }, [profile?.preferredGenreIds, prefsResp?.result]);
  
  // List data
  const watchList = watchResp?.result || [];
  const favoriteList = favoriteResp?.result || [];

  const toggle = async (id) => {
    // Optimistic update for instant feedback
    const newSelected = new Set(selectedGenres);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedGenres(newSelected);
    
    try {
      setIsUpdating(true);
      await updatePrefs(Array.from(newSelected));
      // Refetch to get latest data from backend
      refetch();
    } catch (error) {
      // Revert on error
      setSelectedGenres(selectedGenres);
      console.error('Failed to update preferences:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="mt-[100px] pb-16 bg-gray-50 min-h-screen">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Dashboard</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {(profile?.name || profile?.username)?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {profile?.name ? `${profile.name} ${profile.surname || ''}`.trim() : profile?.username}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {profile?.roles?.join(', ') || 'Member'}
                    </p>
                  </div>
                </div>
                <AccountList />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Account Info Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 relative">
                    Account Information
                    <div className="absolute -bottom-2 left-0 w-16 h-1 netflix-gradient"></div>
                  </h2>
                </div>
                {profileLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <span className="ml-3 text-gray-500">Loading profile...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Username</label>
                      <p className="text-lg font-medium text-gray-800">{profile?.username || 'Not provided'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
                      <p className="text-lg font-medium text-gray-800 capitalize">
                        {profile?.name ? `${profile.name} ${profile.surname || ''}`.trim() : 'Not provided'}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
                      <p className="text-lg font-medium text-gray-800">{profile?.email || 'Not provided'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-600 mb-2">Role</label>
                      <div className="flex flex-wrap gap-2">
                        {profile?.roles?.map((role, index) => (
                          <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium capitalize">
                            {role}
                          </span>
                        )) || <p className="text-lg font-medium text-gray-800">Member</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Preferences Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 relative">
                    Movie Preferences
                    <div className="absolute -bottom-2 left-0 w-16 h-1 netflix-gradient"></div>
                  </h2>
                  <span className="text-sm text-gray-500">
                    {selectedGenres.size} genre{selectedGenres.size !== 1 ? 's' : ''} selected
                    {isUpdating && <span className="ml-2 text-indigo-600">●</span>}
                  </span>
                </div>
                
                {(prefsLoading || genresLoading || profileLoading) && (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <span className="ml-3 text-gray-500">Loading preferences...</span>
                  </div>
                )}
                
                {!prefsLoading && !genresLoading && !profileLoading && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {genres.map(g => {
                      const isSelected = selectedGenres.has(g.id);
                      return (
                        <button
                          key={g.id}
                          disabled={isUpdating}
                          className={`px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                            isSelected 
                              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                          }`}
                          onClick={() => toggle(g.id)}
                        >
                          <span className="flex items-center justify-center space-x-2">
                            {isSelected && (
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                            <span>{g.name}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <strong>Tip:</strong> Select your favorite genres to get personalized movie recommendations on the home page.
                  </p>
                </div>
              </div>

              {/* Watch List Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 relative">
                    Watch List
                    <div className="absolute -bottom-2 left-0 w-16 h-1 netflix-gradient"></div>
                  </h2>
                  <span className="text-sm text-gray-500">
                    {watchList.length} movie{watchList.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                {watchLoading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <span className="ml-3 text-gray-500">Loading watch list...</span>
                  </div>
                )}
                
                {!watchLoading && (
                  <>
                    {watchList.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {watchList.map(item => (
                          <MovieCard key={item.id} movie={item.movie} />
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-200">
                        <div className="text-gray-400 text-5xl mb-6">👀</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-3">No movies in watch list</h3>
                        <p className="text-gray-500">Add movies to your watch list from movie details pages</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Favorite List Card */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 relative">
                    Favorite Movies
                    <div className="absolute -bottom-2 left-0 w-16 h-1 netflix-gradient"></div>
                  </h2>
                  <span className="text-sm text-gray-500">
                    {favoriteList.length} movie{favoriteList.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                {favoriteLoading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <span className="ml-3 text-gray-500">Loading favorites...</span>
                  </div>
                )}
                
                {!favoriteLoading && (
                  <>
                    {favoriteList.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {favoriteList.map(item => (
                          <MovieCard key={item.id} movie={item.movie} />
                        ))}
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-200">
                        <div className="text-gray-400 text-5xl mb-6">❤️</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-3">No favorite movies</h3>
                        <p className="text-gray-500">Add movies to your favorites from movie details pages</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
