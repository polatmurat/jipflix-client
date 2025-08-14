const MovieSearchHeader = ({ state, setState, onSearch }) => {
  const onChange = (e) => setState({ ...state, [e.target.name]: e.target.value });
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <input 
            name="title" 
            value={state.title} 
            onChange={onChange} 
            className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" 
            placeholder="Search title..." 
          />
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <input 
            name="directorName" 
            value={state.directorName} 
            onChange={onChange} 
            className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" 
            placeholder="Director name..." 
          />
        </div>
      
        
        <div className="w-20">
          <input 
            name="yearFrom" 
            value={state.yearFrom} 
            onChange={onChange} 
            className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" 
            placeholder="From" 
          />
        </div>
        
        <div className="w-20">
          <input 
            name="yearTo" 
            value={state.yearTo} 
            onChange={onChange} 
            className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" 
            placeholder="To" 
          />
        </div>
        
        <div className="w-20">
          <input 
            name="minRating" 
            value={state.minRating} 
            onChange={onChange} 
            className="w-full px-3 py-2 text-sm rounded border border-gray-300 focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all duration-200" 
            placeholder="Rating" 
          />
        </div>
        
        <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
              state.sortBy === 'releaseYear' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setState({ ...state, sortBy: 'releaseYear' })}
          >
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Newest</span>
            </span>
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
              state.sortBy === 'rating' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setState({ ...state, sortBy: 'rating' })}
          >
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span>Rating</span>
            </span>
          </button>
        </div>
        
        <div className="flex bg-white border border-gray-300 rounded-lg overflow-hidden">
          <button
            type="button"
            className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
              state.sortDir === 'desc' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setState({ ...state, sortDir: 'desc' })}
          >
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span>High</span>
            </span>
          </button>
          <button
            type="button"
            className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
              state.sortDir === 'asc' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setState({ ...state, sortDir: 'asc' })}
          >
            <span className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>Low</span>
            </span>
          </button>
        </div>
        
        <div>
          <button 
            className="px-6 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors duration-200" 
            onClick={onSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};


export default MovieSearchHeader;


