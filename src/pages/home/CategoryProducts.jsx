import Nav from "../../components/home/Nav";
import Header from "../../components/home/Header";
import { useParams, Link } from "react-router-dom";
import { useCatProductsQuery } from "../../features/product/homeProductsService";
import Thumbnail from "../../components/skeleton/Thumbnail";
import Skeleton from "../../components/skeleton/Skeleton";
import Text from "../../components/skeleton/Text";
import currency from "currency-formatter";

const CategoryProducts = () => {
  const { name, page = 1 } = useParams();
  const { data, isFetching } = useCatProductsQuery({
    name,
    page: parseInt(page),
  });

  console.log(data, isFetching);

  return (
    <>
      <Nav />
      <div className="mt-[75px]">
        <Header>
          #{name} {page}
        </Header>
      </div>
      <div className="container my-10">
        {isFetching ? (
          <div className="flex flex-wrap -mx-4">
            {[1, 2, 3].map((item) => (
              <div
                className="w-6/12 sm:w-4/12 md:w-3/12 lg:w-4/12 xl:w-3/12 p-4"
                key={item}
              >
                <Skeleton>
                  <Thumbnail />
                  <Text />
                  <Text />
                </Skeleton>
              </div>
            ))}
          </div>
        ) : data?.count > 0 ? (
          <>
            <p className="mb-3 text-base font-medium text-gray-700">
              {data.count} products have been found in {name}.
            </p>
            <div className="flex flex-wrap -mx-5">
              {data?.products.map((product) => {
                const percentage = product.discount / 100;
                const discountedPrice =
                  product.price - product.price * percentage;
                console.log(discountedPrice);

                return (
                  <div key={product._id} className="w-full md:w-3/12">
                    <Link to="/">
                      <div className="w-full px-5 pt-10">
                        <img
                          src={`/images/${product.image1}`}
                          alt="Product Image"
                          className="w-full h-[310px] object-cover"
                        />
                      </div>
                      <p className="capitalize font-medium text-base text-black mx-4 mt-3">
                        {product.title}
                      </p>
                      <div className="flex justify-between mt-3">
                        <span className="mx-4 text-lg font-medium text-black">
                          {currency.format(discountedPrice, { code: "USD" })}
                        </span>
                        <span className="mx-4 text-lg font-medium text-gray-600 line-through">
                          {currency.format(product.price, { code: "USD" })}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div>{`The ${name} category has no products yet.`}</div>
        )}
      </div>
    </>
  );
};

export default CategoryProducts;
