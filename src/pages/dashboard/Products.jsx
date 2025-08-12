import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Wrapper from "./Wrapper";
import { BsBox } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../app/reducers/globalReducer";
import toast, { Toaster } from "react-hot-toast";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../features/product/productService";
import ScreenHeader from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";

const Products = () => {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }

  const { data = [], isFetching } = useGetProductsQuery(page ? page : 1);

  const { success } = useSelector((state) => state.globalReducer);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(success);
    }

    return () => {
      dispatch(clearMessage());
    };
  }, []);

  const [deleteProduct, response] = useDeleteProductMutation();
  
  const delProd = (prodID) => {
    if (window.confirm("Are you sure to delete that product?")) {
      deleteProduct(prodID);
    }
  };

  return (
    <Wrapper>
      <ScreenHeader>
        <Link
          to="/dashboard/create-product"
          className="btn-dark inline-flex items-center"
        >
          <BsBox className="mr-2" />
          Create Product
        </Link>
        <Toaster position="top-right" />
      </ScreenHeader>
      {!isFetching ? (
        data?.products?.length > 0 ? (
          <>
            <div>
              <table className="w-full bg-palette1 rounded-md">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="p-3 uppercase text-base font-sm text-gray-500">
                      Name
                    </th>
                    <th className="p-3 uppercase text-base font-sm text-gray-500">
                      {`$ Price`}
                    </th>
                    <th className="p-3 uppercase text-base font-sm text-gray-500">
                      Stock
                    </th>
                    <th className="p-3 uppercase text-base font-sm text-gray-500">
                      Image
                    </th>
                    <th className="p-3 uppercase text-base font-sm text-gray-500">
                      Edit
                    </th>
                    <th className="p-3 uppercase text-base font-sm text-gray-500">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products.map((product) => (
                    <tr key={product._id} className="odd:bg-gray-800">
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        {product.title}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        {"$" + product.price + ".00"}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        {product.stock}
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <img
                          src={`/images/${product.image1}`}
                          alt="image name"
                          className="w-20 h-20 rounded-md object-cover"
                        />
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <Link
                          to={`/dashboard/update-product/${product._id}`}
                          className="bg-palette4 w-1/4 px-5 py-2 cursor-pointer text-white rounded-md"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="p-3 capitalize text-sm font-normal text-gray-400">
                        <a
                          className="bg-red-500 w-1/4 px-4 py-2 cursor-pointer text-white rounded-md"
                          onClick={() => delProd(product._id)}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              page={parseInt(page)}
              perPage={data.perPage}
              count={data.count}
              path="dashboard/products"
            />
          </>
        ) : (
          "There is no products, have been added yet."
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Products;
