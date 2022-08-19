import React, { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/inertia-react";
import { ToastContainer } from "react-toastify";

export default function Admin({ auth, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] =
    useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href="/">
                  <ApplicationLogo className="block h-9 w-auto text-gray-500" />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                <NavLink
                  href={route("dashboard")}
                  active={route().current("dashboard")}
                >
                  Dashboard
                </NavLink>
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ml-6">
              <div className="ml-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                      >
                        {auth.user.name}

                        <svg
                          className="ml-2 -mr-0.5 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link
                      href={route("logout")}
                      method="post"
                      as="button"
                    >
                      Log Out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() =>
                  setShowingNavigationDropdown(
                    (previousState) => !previousState
                  )
                }
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    className={
                      !showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={
                      showingNavigationDropdown ? "inline-flex" : "hidden"
                    }
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"
          }
        >
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink
              href={route("dashboard")}
              active={route().current("dashboard")}
            >
              Dashboard
            </ResponsiveNavLink>
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="px-4">
              <div className="font-medium text-base text-gray-800">
                {auth.user.name}
              </div>
              <div className="font-medium text-sm text-gray-500">
                {auth.user.email}
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink
                method="post"
                href={route("logout")}
                as="button"
              >
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto sm:px-2 lg:px-4">
        <ToastContainer />
        <div className="grid grid-cols-1 md:grid-cols-8 gap-2">
          <div className="py-4 col-span-1 md:col-span-2">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-1 py-4 bg-white border-b border-gray-200">
                <Link
                  href={route("dashboard")}
                  className="flex items-center justify-start"
                >
                  <svg
                    width="250"
                    className="h-4 w-8"
                    height="210"
                    viewBox="0 0 250 210"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M198.177 136.097C192.406 136.097 187.722 131.414 187.722 125.643C187.722 119.872 192.406 115.188 198.177 115.188H249.927C247.7 88.4454 237.11 64.0866 220.706 44.7141L198.93 66.5016C196.881 68.5505 194.215 69.5649 191.538 69.5649C188.862 69.5649 186.185 68.551 184.147 66.5016C180.059 62.4243 180.059 55.8065 184.147 51.719L205.923 29.9315C186.562 13.5386 162.192 2.93765 135.449 0.721605V52.4614C135.449 58.2323 130.776 62.9158 124.995 62.9158C119.224 62.9158 114.54 58.2323 114.54 52.4614V0.721115C87.808 2.93765 63.4385 13.5386 44.0763 29.931L65.853 51.7185C69.9405 55.806 69.9405 62.4238 65.853 66.5011C63.8143 68.55 61.1381 69.5644 58.4614 69.5644C55.7852 69.5644 53.1085 68.5505 51.0699 66.5011L29.2932 44.7136C12.8905 64.0861 2.29984 88.4454 0.0730186 115.188H51.8128C57.594 115.188 62.2672 119.871 62.2672 125.642C62.2672 131.413 57.594 136.097 51.8128 136.097H0C2.13273 161.47 11.9599 185.787 28.2376 205.483C30.2135 207.888 33.172 209.278 36.2878 209.278H213.712C216.828 209.278 219.786 207.888 221.762 205.483C238.04 185.787 247.867 161.47 250 136.097H198.177V136.097ZM126.793 146.552L97.2274 116.986L156.358 87.4104L126.793 146.552Z"
                      fill="black"
                    />
                  </svg>
                  Dashbord
                </Link>
                <Link
                  href={route("home")}
                  className="flex items-center justify-start items-center mt-6 ml-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Accuiel
                </Link>
                <div className="border border-b w-full my-6"></div>
                <div className="flex flex-col px-2">
                  <div className="products group">
                    <Link
                      href={route("products.index")}
                      className="flex gap-1 items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                      Produits
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Link>
                    <div className="px-4 text-sm py-2 group-hover:block hidden">
                      <Link href={route("products.create")}>Ajouter</Link>
                    </div>
                  </div>
                </div>
                <div className="border border-b w-full my-6"></div>
                <div className="flex flex-col px-2">
                  <div className="products group">
                    <Link
                      href={route("admin.orders.index")}
                      className="flex gap-1 items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      Commandes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4 col-span-1 md:col-span-6">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-white border-b border-gray-200">
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                  {header}
                </h2>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
