import type { SVGProps } from "react";
import { Link } from "react-router";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
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
}

export const Navbar = () => {
  return (
    <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex-1 md:flex md:items-center md:gap-12">
          <Link className="block text-indigo-600" to="/">
            <span className="sr-only">Resume Inspector</span>
            <Logo className="h-10 w-10" />
          </Link>
        </div>

        <div className="md:flex md:items-center md:gap-12">
          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Link
                className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                to="/upload"
              >
                Upload Resume
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
