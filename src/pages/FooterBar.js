"use client";

import { Footer } from "flowbite-react";

export default function FooterBar() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full font-md justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.LinkGroup className="flex gap-10 ml-auto mr-auto p-2">
            <Footer.Link href="#">Home</Footer.Link>
            <Footer.Link href="#">All Products</Footer.Link>
            <Footer.Link href="#">About us</Footer.Link>
            <Footer.Link href="#">Contact us</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          className="mb-5"
          href="#"
          by="Nepal Music Gallery"
          year={2024}
        />
      </div>
    </Footer>
  );
}
