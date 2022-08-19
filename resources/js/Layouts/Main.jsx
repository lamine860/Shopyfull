import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import NavBar from "@/Components/Nav/NavBar";
import { ToastContainer } from "react-toastify";

export default function Main({ children, query }) {
  const auth = usePage().props.auth;
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar {...query} />
      <div className="max-w-7xl m-auto mt-6 mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-hidden">
        <ToastContainer />
        {children}
      </div>
    </div>
  );
}
