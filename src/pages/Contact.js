import React from "react";
import { Carousel } from "rsuite";

const shopLocations = [
  {
    name: "Lainchaur",
    address: "Nepal Scout Building, Leknath Marg, Kathmandu 44600",
    phoneNumber: "Phone: 9841805379",
  },
  {
    name: "Baudhha",
    address: "Boudha Rd, Kathmandu 44600",
    phoneNumber: "Phone: 9841805379",
  },
];

const Contact = () => {
  return (
    <div className="w-full -mt-10 bg-white shadow-md rounded-md p-6">
      <div className="max-w-5xl mx-auto flex gap-9 flex-col lg:flex-row lg:divide-x lg:divide-gray-300">
        <div className="lg:w-1/2 lg:pr-6 mb-6 lg:mb-0">
          <Carousel autoplay className="custom-slider mb-8">
            <img src="./loc.png" alt="Location 1" />
            <img src="./loc1.png" alt="Location 2" />
            {/* Add more images here if needed */}
          </Carousel>
        </div>
        <div className="lg:w-1/2 lg:pl-6 mt-7">
          <p className=" mt-4 mb-4 text-gray-800 text-lg font-serif">
            <strong className="text-red-800 font-sans text-2xl ">
              Nepal Music Gallery
            </strong>{" "}
            is your one-stop shop for musical instruments in Kathmandu. Visit
            our two convenient locations to explore our wide selection of
            instruments and accessories.
          </p>
          {shopLocations.map((location, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {location.name}
              </h3>
              <p className="text-gray-700 font-serif mb-1">
                {location.address}
              </p>
              <p className="text-gray-800 font-bold">{location.phoneNumber}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
