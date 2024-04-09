import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "react-router-dom";
import { Form } from "react-router-dom";
// import { setSearchQuery, setSearchResults } from "./actions";
import { filteredValue } from "../../product-list/productSlice";
import { FilteredProductState } from "../../../hooks/useFilteredProduct";
import { useGetFilteredValue } from "../../../pages/Home";
export default function Search() {
  // const filteredvalue = useContext(FilteredProductState);
  const { filteredProduct, setFilteredProduct } = useGetFilteredValue("");
  const handleSearch = () => {};
  return (
    <Form>
      <div class="mt-2 w-full flex ">
        <div class="relative mb-4 flex w-full flex-wrap items-stretch space-x-4 ">
          <input
            type="search"
            class="relative bg-white m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.10rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700   dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            // value={searchQuery}
            onChange={(e) => {
              setFilteredProduct(e.target.value);
            }}
          />
          <button type="submit">
            <span
              class="  input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
              id="basic-addon2"
              className="text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5 "
              >
                <path
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </Form>
  );
}
