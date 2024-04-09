import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetOrder } from "../features/order/orderSlice";

export default function OrderSuccessPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (params && params.id) {
      // reset cart
      dispatch(resetCartAsync());
      // reset currentOrder
      dispatch(resetOrder());
    }
  }, [dispatch, user, params]);

  // Check if params.id is not present and redirect if needed
  if (!params || !params.id) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-full -mt-8 place-items-center bg-white px-6 py-15 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-red-600">
            Order Successfully Placed
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Order Number #{params?.id}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            You can check your order in My Account / My Orders
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
