import { useContext, useState } from "react";
import NavBar from "../features/navbar/components/NavBar";

import { FilteredProductState } from "../hooks/useFilteredProduct";
import AdminProductList from "../features/admin/components/AdminProductList";

export default function Home() {
  const [filteredProduct, setFilteredProduct] = useState("");

  return (
    <FilteredProductState.Provider
      value={{ filteredProduct, setFilteredProduct }}
    >
      <div className="w-full overflow-hidden">
        <NavBar />
        <AdminProductList className="-pt-6" />
      </div>
    </FilteredProductState.Provider>
  );
}

export function useGetFilteredValue() {
  const filteredValue = useContext(FilteredProductState);
  return filteredValue;
}
