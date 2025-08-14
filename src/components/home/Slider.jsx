import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useGetGenresQuery } from "../../features/genre/genresService";
import Spinner from "../Spinner";
import "swiper/css";
import "swiper/css/pagination";

const Slider = () => {
  const { data, isFetching } = useGetGenresQuery();
  const genres = data?.result || [];

  return isFetching ? (
    <div className="container h-[70vh] flex items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="swiper mt-[70px]"
    >
      {genres.length > 0 &&
        genres.map((g, index) => {
          const id = index < 8 ? (g.id ?? (index + 1)) : 8;
          return (
          <SwiperSlide className="swiper-slide" key={`${g.id}-${index}`}>
            <div className={`absolute inset-0 bg-no-repeat bg-cover `}>
              {" "}
              <img
                src={`/src/assets/images/genre/${id}.jpg`}
                alt="Slider Pictures"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 w-full h-full bg-black/50">
              <div className="container h-[70vh] flex flex-col items-center justify-center">
                <h1 className="text-white text-xl font-medium capitalize">
                  {g.name}
                </h1>
                <div className="mt-10">
                  <Link to={`/genre/${id}`} className="btn-indigo text-sm">
                    Browse Collections
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );})}
    </Swiper>
  );
};

export default Slider;
