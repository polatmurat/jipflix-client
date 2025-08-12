import { Virtual } from "swiper/modules";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useAllCategoriesQuery } from "../../features/category/categoryService";

import "swiper/css/virtual";
import Skeleton from "../skeleton/Skeleton";
import Thumbnail from "../skeleton/Thumbnail";

const Categories = () => {
  const { data, isFetching } = useAllCategoriesQuery();

  let i = 1;

  return isFetching
    ? <div className="flex flex-wrap -mx-4">
        {[1,2,3,4,5,6].map(item => (
          <div className="w-6/12 sm:w-4/12 md:w-3/12 lg:w-[20%] xl:w-2/12 p-4" key={item}>
            <Skeleton>
              <Thumbnail />
            </Skeleton>
          </div>
        ))}
    </div>
    : data?.categories?.length > 0 && (
        <Swiper
          modules={[Virtual]}
          spaceBetween={20}
          slidesPerView={6}
          virtual
          className="w-full h-[150px] mb-10"
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1080: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            },
          }}
        >
          {data.categories.map((category, index) => {
            if (i >= 6) {
              i = 1;
            } else {
              i++;
            }

            return (
              <SwiperSlide
                key={index}
                virtualIndex={index}
                className="w-full overflow-hidden rounded-lg relative text-white capitalize aspect-w-1 aspect-h-1"
              >
                <div className="relative w-full h-full">
                  <div className="w-full h-full rounded-lg overflow-hidden absolute inset-0">
                    <img
                      src={`./images/slider/slider${i}.jpg`}
                      className="w-full h-full object-cover absolute top-0 left-0"
                      alt="Slider"
                    />
                  </div>
                  <div className="absolute inset-0 flex justify-center items-center p-4 bg-black/50">
                    <Link to={`/category-products/${category.name}`} className="text-white text-base font-medium capitalize">{category.name}</Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      );
};

export default Categories;
