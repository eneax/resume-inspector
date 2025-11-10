import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { usePuterStore } from "~/lib/puter";

export function meta() {
  return [
    { title: "Resume Inspector | Auth" },
    {
      name: "description",
      content: "Log into your account.",
    },
  ];
}

export default function Auth() {
  const { isLoading, auth } = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const next = location.search.split("next=")[1];

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);

  return (
    <main
      className="bg-main-pattern fixed inset-0 z-50 grid place-content-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="authentication"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2
          id="authentication"
          className="text-xl font-bold text-gray-900 sm:text-2xl"
        >
          Welcome!
        </h2>

        <div className="mt-4">
          <p className="text-pretty text-gray-700">
            Please log in to continue to your dashboard.
          </p>
        </div>

        <footer className="mt-6 flex justify-end gap-2">
          {isLoading ? (
            <button
              type="button"
              className="h-12 rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 cursor-pointer"
            >
              Signing you in ...
            </button>
          ) : (
            <>
              {auth.isAuthenticated ? (
                <button
                  type="button"
                  className="h-12 rounded-sm border border-red-600 bg-red-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-red-600 cursor-pointer"
                  onClick={auth.signOut}
                >
                  Log Out
                </button>
              ) : (
                <button
                  type="button"
                  className="h-12 rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 cursor-pointer"
                  onClick={auth.signIn}
                >
                  Log In
                </button>
              )}
            </>
          )}
        </footer>
      </div>
    </main>
  );
}
