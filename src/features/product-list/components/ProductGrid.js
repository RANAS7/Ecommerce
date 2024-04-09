import { Link } from "react-router-dom";

export default function ProductGrid({ products }) {
  return (
    <div className="bg-white font-sans">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <Link to={`/product-detail/${product.id}`} key={product.id}>
              <div className="group relative  p-2 border-gray-200">
                <div className=" overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img
                    src={`http://localhost:8080/images/${product.thumbnail}`}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                </div>
                <div className="mt-4 flex gap-1 justify-between ">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <div href={product.thumbnail}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </div>
                      {product.discountPercentage > 0 && (
                        <span>{product.discountPercentage}% off</span>
                      )}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      <span className=" align-bottom">{product.rating}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm block font-medium text-gray-900">
                      NPR
                      {Math.round(
                        product.price * (1 - product.discountPercentage / 100)
                      )}
                    </p>
                    {product.discountPercentage > 0 && (
                      <p className="text-sm block line-through font-medium text-gray-400">
                        NPR {product.price}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
