import Cart from "../features/cart/Cart";
import NavBar from "../../src/features/navbar/components/NavBar";
import FooterBar from "./FooterBar";
export default function Cartpage() {
  return (
    <div>
      <NavBar />
      <Cart />
      <FooterBar />
    </div>
  );
}
