import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useRandomCategoriesQuery } from "../../features/category/categoryService";
import Spinner from "../Spinner";
import "swiper/css";
import "swiper/css/pagination";

const Slider = () => {
  const { data, isFetching } = useRandomCategoriesQuery();
  console.log(data, isFetching);

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
      className="swiper mt-[75px]"
    >
      {data?.categories.length > 0 &&
        data?.categories.map((category, index) => (
          <SwiperSlide className="swiper-slide" key={category._id}>
            <div className={`absolute inset-0 bg-no-repeat bg-cover `}>
              {" "}
              <img
                src={`./images/slider/slider${index + 1}.jpg`}
                alt="Slider Pictures"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 w-full h-full bg-black/50">
              <div className="container h-[70vh] flex flex-col items-center justify-center">
                <h1 className="text-white text-xl font-medium capitalize">
                  {category.name}
                </h1>
                <div className="mt-10">
                  <Link to={`/category-products/${category.name}`} className="btn-indigo text-sm">
                    Browse Collections
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Slider;
