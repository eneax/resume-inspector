import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/home";

import { usePuterStore } from "~/lib/puter";
import { Navbar } from "~/components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Inspector" },
    {
      name: "description",
      content: "Get insights into your resume and land your dream job!",
    },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated]);

  return (
    <main className="bg-main-pattern">
      <Navbar />

      <section className="max-w-md text-center mx-auto py-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="mx-auto size-20 text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
          ></path>
        </svg>

        <h2 className="mt-6 text-2xl font-bold text-gray-900">
          Get started in seconds
        </h2>

        <p className="mt-4 text-pretty text-gray-700">
          Upload your resume and get instant insights to help you land your
          dream job.
        </p>
      </section>
    </main>
  );
}
