import NavBar from "../../src/features/navbar/components/NavBar";
import { AboutUs } from "./AboutUs";
import FooterBar from "./FooterBar";
import Footer from "./FooterBar";
export default function About() {
  return (
    <div>
      <NavBar />
      <div className="-mt-10">
        <AboutUs />
      </div>
      <div className=" mt-2 ">
        <FooterBar />
      </div>
    </div>
  );
}
