import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Wrapper from "./Wrapper";
import { BsArrowLeft } from "react-icons/bs";
import { TwitterPicker } from "react-color";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../../components/Spinner";
import toast, { Toaster } from 'react-hot-toast';
import ScreenHeader from "../../components/ScreenHeader";
import { useAllCategoriesQuery } from "../../features/category/categoryService";
import { useCreateProductMutation } from "../../features/product/productService";
import { useState, useEffect } from "react";
import Colors from "../../components/Colors";
import SizeList from "./SizeList";
import ImagePreview from "../../components/ImagePreview";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { setSuccess } from "../../app/reducers/globalReducer";

const CreateProduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data = [], isFetching } = useAllCategoriesQuery();

  const [value, setValue] = useState("");

  const [state, setState] = useState({
    title: "",
    price: 0,
    discount: 0,
    stock: 0,
    category: "",
    colors: [],
    image1: "",
    image2: "",
    image3: "",
  });

  const handleProduct = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const saveColors = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.hex);
    setState({
      ...state,
      colors: [...filtered, { color: color.hex, id: uuidv4() }],
    });
  };

  const deleteColors = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.color);
    setState({ ...state, colors: filtered });
  };

  const deleteSize = (sizeName) => {
    const filtered = sizeList.filter((size) => size.name !== sizeName);
    setSizeList(filtered);
  };

  const [sizes] = useState([
    { name: "xsm" },
    { name: "sm" },
    { name: "md" },
    { name: "lg" },
    { name: "xl" },
    { name: "1 years" },
    { name: "2 years" },
    { name: "3 years" },
    { name: "4 years" },
    { name: "5 years" },
  ]);

  const [sizeList, setSizeList] = useState([]);
  const [preview, setPreview] = useState({
    image1: "",
    image2: "",
    image3: "",
  });

  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({ ...preview, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // console.log(preview);

  const chooseSize = (sizeObject) => {
    const filtered = sizeList.filter((size) => size.name !== sizeObject.name);
    setSizeList([...filtered, sizeObject]);
  };

  const [createNewProduct, response] = useCreateProductMutation();
  console.log("Y Resonse : ", response);

  const createProd = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("data", JSON.stringify(state));
    
    formData.append('description', value)
    formData.append("image1", state.image1);
    formData.append("image2", state.image2);
    formData.append("image3", state.image3);

    formData.append("sizes", JSON.stringify(sizeList));

    createNewProduct(formData);
  };

  useEffect(() => {
    if(!response.isSuccess) {
      response?.error?.data?.errors.map(err => {
        toast.error(err.msg);
      })
    }
  }, [response?.error?.data?.errors]);

  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
      navigate("/dashboard/products");
    }
  }, [response?.isSuccess]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link
          to="/dashboard/products"
          className="btn-dark inline-flex items-center"
        >
          <BsArrowLeft className="mr-2" />
          Products List
        </Link>
      </ScreenHeader>
      <Toaster position="top-right" reverseOrder />
      <div className="flex flex-wrap -mx-3">
        <form className="w-full xl:w-8/12 p-3" onSubmit={createProd}>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 p-3">
            <label htmlFor="colors" className="input-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                placeholder="Product Title..."
                onChange={handleProduct}
                value={state.title}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
            <label htmlFor="colors" className="input-label">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="form-control"
                placeholder="Product Price..."
                onChange={handleProduct}
                value={state.price}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
            <label htmlFor="colors" className="input-label">
                Discount
              </label>
              <input
                type="number"
                name="discount"
                id="discount"
                className="form-control"
                placeholder="Discount..."
                onChange={handleProduct}
                value={state.discount}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
            <label htmlFor="colors" className="input-label">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                className="form-control"
                placeholder="Stock..."
                onChange={handleProduct}
                value={state.stock}
              />
            </div>
            <div className="w-full md:w-6/12 p-3">
              {!isFetching ? (
                data.categories.length > 0 && (
                  <select
                    name="category"
                    id="categories"
                    className="form-control"
                    onChange={handleProduct}
                    value={state.category}
                  >
                    <option value="">Choose Category...</option>
                    {data?.categories?.map((category) => (
                      <option
                        value={category.name}
                        key={category._id}
                        className="capitalize"
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                )
              ) : (
                <Spinner />
              )}
            </div>
            <div className="w-full md:w-6/12 p-3">
              <label htmlFor="colors" className="input-label">
                Choose Color
              </label>
              <TwitterPicker className="mt-3" onChangeComplete={saveColors} />
            </div>
            <div className="w-full p-3">
              <label htmlFor="sizes">Choose Sizes</label>
              {sizes.length > 0 && (
                <div className="flex flex-wrap -mx-3">
                  {sizes.map((size) => (
                    <div
                      key={size.name}
                      onClick={() => chooseSize(size)}
                      className="size"
                    >
                      {size.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full lg:w-4/12 p-3">
              <label htmlFor="image1" className="label">
                Image 1
              </label>
              <input
                type="file"
                name="image1"
                id="image1"
                className="input-file"
                onChange={imageHandle}
              />
            </div>
            <div className="w-full lg:w-4/12 p-3">
              <label htmlFor="image2" className="label">
                Image 2
              </label>
              <input
                type="file"
                name="image2"
                id="image2"
                className="input-file"
                onChange={imageHandle}
              />
            </div>
            <div className="w-full lg:w-4/12 p-3">
              <label htmlFor="image3" className="label">
                Image 3
              </label>
              <input
                type="file"
                name="image3"
                id="image3"
                className="input-file"
                onChange={imageHandle}
              />
            </div>
            <div className="w-full p-3">
              <label htmlFor="description" className="label">
                Description
              </label>
              <ReactQuill
                theme="snow"
                value={value}
                id="description"
                onChange={setValue}
                className="placeholder:text-white"
                placeholder="Description..."
              />
            </div>
            <div className="w-full p-3">
              <input
                type="submit"
                value={response.isLoading ? 'Loading...' : 'Save Product'}
                disabled={response.isLoading ? true : false}
                className="btn-dark py-2 -my-2"
              />
            </div>
          </div>
        </form>
        <div className="w-full xl:w-4/12 p-3">
          <Colors colors={state.colors} deleteColors={deleteColors} />
          <SizeList list={sizeList} deleteSize={deleteSize} />
          <ImagePreview url={preview.image1} heading="image 1" />
          <ImagePreview url={preview.image2} heading="image 2" />
          <ImagePreview url={preview.image3} heading="image 3" />
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;
