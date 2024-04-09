import NavBar from "../features/navbar/components/NavBar";
import ProductDetails from "../features/product-list/components/ProductDetails";
import FooterBar from "./FooterBar";

export default function ProductDetailsPage() {
  return (
    <NavBar>
      <ProductDetails />
      <FooterBar />
    </NavBar>
  );
}
