import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectAllProducts,
  selectProductById,
  selectProductListStatus,
} from "../productSlice";

import Carousel from "rsuite/Carousel";

// (Optional) Import component styles. If you are using Less, import the `index.less` file.
import "rsuite/Carousel/styles/index.css";
import { useParams } from "react-router-dom";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { Grid } from "react-loader-spinner";
import ProductGrid from "./ProductGrid";
import { FilteredProductState } from "../../../hooks/useFilteredProduct";
import { useGetFilteredValue } from "../../../pages/Home";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const items = useSelector(selectItems);
  const product = useSelector(selectProductById);
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const params = useParams();
  const status = useSelector(selectProductListStatus);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const handleCart = (e) => {
    e.preventDefault();
    console.log("Product:", product);
    console.log("Items:", items);
    if (
      product &&
      product.id &&
      items.findIndex(
        (item) => item.product && item.product.id === product.id
      ) < 0
    ) {
      console.log({ items, product });
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      if (selectedColor) {
        newItem.color = selectedColor;
      }
      if (selectedSize) {
        newItem.size = selectedSize;
      }
      // Dispatch the addToCartAsync action with the newItem object
      dispatch(addToCartAsync(newItem));
      toast.success("Item added to cart", {
        position: "bottom-left",
      }); // Display success notification
    } else {
      toast.error("Item already added", {
        position: "bottom-left",
      }); // Display error notification
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="bg-white">
      <ToastContainer />{" "}
      {/* Add ToastContainer at the top level of your component */}
      {status === "loading" ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229) "
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : null}{" "}
      {product && (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="capitlize font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:col-span-1 lg:border-r lg:border-gray-200 lg:pr-8">
              <Carousel autoplay className=" custom-slider">
                <img
                  src={`http://localhost:8080/images/${product.thumbnail}`}
                  alt={product.title}
                  className="w-fit h-full object-contain"
                />
                <img
                  src={`http://localhost:8080/images/${product.image1}`}
                  alt={product.title}
                  className="w-fit h-full object-contain"
                />
                <img
                  src={`http://localhost:8080/images/${product.image2}`}
                  alt={product.title}
                  className="w-fit h-full object-contain"
                />
                <img
                  src={`http://localhost:8080/images/${product.image3}`}
                  alt={product.title}
                  className="w-fit h-full object-contain"
                />
              </Carousel>
            </div>
            <div className="lg:col-span-1 p-4 lg:pt-6 lg:pl-8 lg:border-gray-200 lg:border-l">
              <h1 className="text-2xl mb-6 capitalize font-sans font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
              <div className="flex gap-4 ">
                <h3 className=" font-semibold  ">Brand : </h3>
                <p className="  textbase    tracking-tight text-gray-900">
                  {product.brand}
                </p>
              </div>
              <div className="flex gap-4">
                <h3 className=" font-semibold mt-4 ">Category : </h3>
                <p className="  textbase mt-4  tracking-tight text-gray-900">
                  {product.category}
                </p>
              </div>

              {/* Rest of your content for the second div */}
              <div className=" mt-8 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <div className="flex mt-5 p-3  gap-6">
                  <p className="text-3xl text-bold font-bold  textbase  tracking-tight text-gray-900">
                    NPR {product.discountPrice}
                  </p>
                  {product.discountPercentage > 0 && (
                    <p className="text-sm block line-through font-medium text-gray-400">
                      NPR {product.price}
                    </p>
                  )}
                  <br />
                </div>

                <form className="mt-6">
                  <button
                    onClick={handleCart}
                    type="submit"
                    className="mt-10 flex  items-center justify-center rounded-md border border-transparent bg-red-700 px-6 w-full py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className=" font-semibold text-xl">Description</h3>

                  <div className="space-y-6 mt-2">
                    <p className="text-base  text-gray-900">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="flex gap-1 font-semibold items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      />
                    </svg>
                    Highlights
                  </h3>

                  <div className="space-y-6">
                    <p className="mt-2 p-1  text-base text-gray-900">
                      {product.highlights}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        {product &&
          products.filter(
            (p) =>
              p.id !== product.id &&
              (p.brand.toLowerCase() === product.brand.toLowerCase() ||
                p.category.toLowerCase() === product.category.toLowerCase())
          ).length > 0 && (
            <div className="mx-auto  h-full max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-4xl lg:px-7">
              <h2 className="text-2xl text-center font-sans text-gray-600font-bold mt-8 mb-4">
                Related Products
              </h2>
              <div className=" lg:h-full">
                <ProductGrid
                  className="w-full h-full"
                  products={products.filter(
                    (p) =>
                      p.id !== product.id &&
                      (p.brand.toLowerCase() === product.brand.toLowerCase() ||
                        p.category.toLowerCase() ===
                          product.category.toLowerCase())
                  )}
                />
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
