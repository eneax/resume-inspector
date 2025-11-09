import { useState, type SVGProps } from "react";
import { Link } from "react-router";

import { usePuterStore } from "~/lib/puter";

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      fill="currentColor"
      d="M17 16q-1.25 0-2.125-.875T14 13t.875-2.125T17 10t2.125.875T20 13t-.875 2.125T17 16m-6 7v-4.275q1.05-.6 2.15-1t2.3-.6L17 19l1.55-1.875q1.2.15 2.3.575t2.15 1V23zm-2-2H3V3h18v7q-.775-.975-1.75-1.487T17 8V7H7v2h7q-.5.4-.9.9t-.675 1.1H7v2h5q0 .525.113 1.025t.312.975H7v2h2z"
    ></path>
  </svg>
);

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
    ></path>
  </svg>
);

export const Navbar = () => {
  const { auth } = usePuterStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex-1 md:flex md:items-center md:gap-12">
          <Link className="block text-indigo-600" to="/">
            <span className="sr-only">Resume Inspector</span>
            <Logo className="h-10 w-10" />
          </Link>
        </div>

        <div className="relative block">
          <Link
            className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm"
            to="/upload"
          >
            Upload
          </Link>

          <button
            type="button"
            className="rounded-md bg-gray-100 ml-4 px-5 py-2.5 text-sm font-medium text-indigo-600 cursor-pointer"
            onClick={toggleMenu}
          >
            Menu
          </button>

          <div
            className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
            role="menu"
            style={{ display: isOpen ? "block" : "none" }}
          >
            <div className="p-2">
              <Link
                to="/profile"
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                role="menuitem"
              >
                Profile
              </Link>

              <Link
                to="/dashboard"
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                role="menuitem"
              >
                Dashboard
              </Link>
            </div>

            <div className="p-2">
              <button
                role="menuitem"
                onClick={auth.signOut}
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50 cursor-pointer"
              >
                <ArrowIcon />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
