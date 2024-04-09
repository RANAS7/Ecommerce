import { createContext } from "react";

export const FilteredProductState = createContext({
  filteredProduct: "",
  setFilteredProduct: () => {},
});
export const selectFilteredItems = (state) => state.product.filteredProduct;
