import { useContext, useState } from "react";
import NavBar from "../features/navbar/components/NavBar";
import ProductList from "../features/product-list/components/ProductList";
import { FilteredProductState } from "../hooks/useFilteredProduct";
import FooterBar from "./FooterBar";

export default function Home() {
  const [filteredProduct, setFilteredProduct] = useState("");

  return (
    <FilteredProductState.Provider
      value={{ filteredProduct, setFilteredProduct }}
    >
      <div className="w-full overflow-hidden">
        <NavBar />
        <ProductList className="-pt-6" />
        <FooterBar />
      </div>
    </FilteredProductState.Provider>
  );
}

export function useGetFilteredValue() {
  const filteredValue = useContext(FilteredProductState);
  return filteredValue;
}
