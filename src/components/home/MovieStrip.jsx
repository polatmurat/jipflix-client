import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css/virtual";
import Skeleton from "../skeleton/Skeleton";
import Thumbnail from "../skeleton/Thumbnail";

const MovieStrip = ({ title, items = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="mt-8">
        {title && <h2 className="heading mb-4">{title}</h2>}
        <div className="flex flex-wrap -mx-4">
          {[1, 2, 3, 4, 5, 6].map((k) => (
            <div className="w-6/12 sm:w-4/12 md:w-3/12 lg:w-[20%] xl:w-2/12 p-4" key={k}>
              <Skeleton>
                <Thumbnail />
              </Skeleton>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <div className="relative">
      {title && (
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 relative">
            {title}
            <div className="absolute -bottom-2 left-0 w-16 h-1 netflix-gradient"></div>
          </h2>
        </div>
      )}
      <Swiper
        modules={[Virtual]}
        spaceBetween={20}
        slidesPerView={6}
        virtual
        className="w-full h-[200px] mb-6"
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1080: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
     >
        {items.map((movie, index) => (
          <SwiperSlide
            key={movie.id ?? index}
            virtualIndex={index}
            className="w-full overflow-hidden rounded-xl relative text-white group cursor-pointer transition-all duration-200 hover:shadow-lg"
          >
            <div className="relative w-full h-full">
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
                  <Link to={`/movie/${movie.id}`} className="text-white text-sm font-semibold truncate pr-2 group-hover:text-indigo-300 transition-colors duration-200">
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieStrip;

