import React, { useState, useEffect } from "react";
import { Carousel } from "rsuite";

export function AboutUs() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex gap-20 overflow-hidden bg-white p-8 mt-4">
      {/* Content */}
      <div className="mb-30 ">
        <div className="mx-auto max-w-7xl px-2 mt-6 lg:px-8">
          <div className="mx-auto  max-w-2xl lg:mx-0">
            <h2 className="text-4xl text-gray-600 font-bold tracking-tight sm:text-6xl">
              Nepal Music Gallery
            </h2>
            <p className="mt-6 text-md leading-8 font-serif text-gray-800">
              Established in 2008, Nepal Music Gallery has always been a leader
              in the field of Western and Eastern Music in Nepal. From musical
              instruments, accessories to print music and digital equipment, we
              have a complete spectrum of musical instruments in the Western,
              Eastern, and Nepali categories.
            </p>
          </div>
          <div className="mx-auto  max-w-2xl lg:mx-0 lg:max-w-none">
            <h3 className="mb-10 text-gray-700 mt-4 stext-xl font-bold">
              Our Locations
            </h3>
            <div className="flex gap-11">
              <div>
                <a
                  className="flex gap-3"
                  href="https://www.google.com/search?q=nepal+music+gallery+&sca_esv=b91db504c3362682&ei=Zt0MZre6E_-D1e8P3dqK0AU&ved=0ahUKEwi3harqnKWFAxX_QfUHHV2tAloQ4dUDCBA&uact=5&oq=nepal+music+gallery+&gs_lp=Egxnd3Mtd2l6LXNlcnAiFG5lcGFsIG11c2ljIGdhbGxlcnkgMgUQABiABDIGEAAYFhgeMgIQJjICECZI4xBQ9QJYrgxwAXgBkAEAmAG1AaABywmqAQMwLji4AQPIAQD4AQGYAgOgArYCwgIKEAAYRxjWBBiwA5gDAIgGAZAGCJIHAzEuMqAH5R4&sclient=gws-wiz-serp"
                >
                  <img
                    src="./lo.jpg"
                    alt="Lainchour"
                    width={"50px"}
                    className="rounded-full"
                  />
                  <p className="text-gray-800 font-bold">Lainchour</p>
                </a>
              </div>
              <div className="">
                <a
                  className="flex gap-3"
                  href="https://www.google.com/search?gs_ssp=eJwFwUEKgCAQAEC6Bn2gk5fOuoiJPqFfrLlatFoUQv2-mX6QWQIcydXCfKvOT-rVjgI4Swas0skYr945OiAwKQarNSItY6ULWZT27KvIyEz3J8LZ4oY_45sZqA&q=nepal+music+gallery+boudha&oq=nepal+music+gallery+&gs_lcrp=EgZjaHJvbWUqEggBEC4YQxivARjHARiABBiKBTIGCAAQRRg7MhIIARAuGEMYrwEYxwEYgAQYigUyBggCEEUYOzIGCAMQRRg7MgYIBBBFGEAyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQg3Mjc3ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8"
                >
                  <img
                    src="./loo.jpg"
                    alt="Baudhha"
                    width={"50px"}
                    className="rounded-full"
                  />
                  <p className="text-gray-800 font-bold">Baudhha</p>
                </a>
              </div>
            </div>
            <div className="mt-10">
              <h3 className=" text-gray-700 mt-4 stext-xl font-bold">
                Our Social Page
              </h3>
            </div>
            <dl className="flex gap-10 mt-6">
              <div className="flex items-center flex-col-reverse">
                <dt className="text-base leading-7 text-gray-800">Facebook</dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-red-600">
                  <img src="./f.png" alt="facebook" width={"40px"} />
                </dd>
              </div>
              <div className="flex items-center flex-col-reverse">
                <dt className="text-base leading-7 text-gray-800 mt-1">
                  Instagram
                </dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight ">
                  <img src="./i.png" alt="facebook" width={"30px"} />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      {/* Image Carousel */}
      {windowWidth >= 900 && (
        <div className="w-full sm:w-1/3 mt-10 mr-10">
          <Carousel autoplay className="custom-slider">
            <img
              src="./p1.png"
              alt="image1"
              className="w-full h-full object-cover"
            />
            <img
              src="./welcome.png"
              alt="image2"
              className="w-full h-full object-cover"
            />
          </Carousel>
        </div>
      )}
    </div>
  );
}
