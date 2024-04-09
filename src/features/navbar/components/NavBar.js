import { Fragment, useState, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../../cart/cartSlice";
import { selectUserInfo, selectUserOrders } from "../../user/userSlice";
import Search from "./Search";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const navigation = [
  { name: "Products", link: "/", user: true },
  { name: "Contact us", link: "/contact", user: true },
  { name: "Products", link: "/admin", admin: true },
  { name: "Orders", link: "/admin/orders", admin: true },
  { name: "About us", link: "/about", user: true, admin: true },
];

const userNavigation = [
  { name: "My Profile", link: "/profile" },
  { name: "My Orders", link: "/orders" },
  { name: "Sign out", link: "/logout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({ children }) {
  const items = useSelector(selectItems);
  const orders = useSelector(selectUserOrders);
  const userInfo = useSelector(selectUserInfo);
  const [showNavigation, setShowNavigation] = useState(true);
  const [showSearch, setShowSearch] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // New state for mobile menu visibility

  useEffect(() => {
    const handleResize = () => {
      setShowNavigation(window.innerWidth >= 1300);
      setShowSearch(window.innerWidth >= 700);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set initial state
    handleResize();

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {userInfo && (
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-white">
            {({ open }) => (
              <>
                <div className="mx-auto  max-w-8xl px-4 sm:px-6 lg:px-8">
                  <div className="flex gap-5 h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Link to="/">
                          <img
                            className="h-12 w-26 mr-48"
                            src="/logo.png"
                            alt="Your Company"
                          />
                        </Link>
                      </div>
                      {showNavigation && (
                        <div className=" flex  ml-60">
                          <div className=" flex w-fit gap-5 items-baseline space-x-6">
                            {navigation.map(
                              (item) =>
                                item[userInfo.role] && (
                                  <Link
                                    key={item.name}
                                    to={item.link}
                                    className={classNames(
                                      item.current
                                        ? "bg-gray-900 text-white w-full"
                                        : "text-black  hover:bg-red-700  hover:text-white",
                                      "w-full px-3 py-1.5 text-sm font-medium whitespace-nowrap" // Apply whitespace-nowrap to prevent line breaks
                                    )}
                                    aria-current={
                                      item.current ? "page" : undefined
                                    }
                                  >
                                    {item.name}
                                  </Link>
                                )
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="md:block ">
                      <div className=" flex items-center md:ml-6">
                        <Link to="/cart">
                          <button
                            type="button"
                            className="rounded-full bg-white-800 p-1 hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            onClick={() => {
                              if (items.length === 0) {
                                toast.error(
                                  "Cart is empty. Please add products to the cart.",
                                  {
                                    position: "bottom-left",
                                  }
                                );
                              }
                            }}
                          >
                            <span className="sr-only">View notifications</span>
                            <ShoppingCartIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </Link>
                        {items.length > 0 && (
                          <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {items.length}
                          </span>
                        )}

                        {/* Profile dropdown */}

                        <Menu as="div" className="relative ml-7">
                          <div>
                            <Menu.Button className="rounded-full bg-white-800 mt-1    hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              {/* SVG Icon */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-8 h-8  rounded-full "
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                              </svg>
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link
                                      to={item.link}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      {window.innerWidth < 1300 && (
                        <Disclosure.Button
                          onClick={() => setShowMobileMenu(!showMobileMenu)}
                          className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      )}
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 md:px-3">
                    {showMobileMenu && (
                      <>
                        {navigation.map(
                          (item) =>
                            item[userInfo.role] && (
                              <Link
                                key={item.name}
                                to={item.link}
                                className={classNames(
                                  item.current
                                    ? "bg-black text-black"
                                    : " text-white bg-gray-600 hover:bg-gray-700 hover:text-white",
                                  "block rounded-md px-3 py-2 text-base font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                                onClick={() => setShowMobileMenu(false)} // Close mobile menu when item clicked
                              >
                                {item.name}
                              </Link>
                            )
                        )}
                      </>
                    )}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {userInfo.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-800">
                          {userInfo.email}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.link}
                          className="block rounded-md px-3 py-2 text-base font-medium text-white bg-gray-600 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default NavBar;
