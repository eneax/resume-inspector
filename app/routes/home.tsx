import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/home";

import { usePuterStore } from "~/lib/puter";

import { Navbar } from "~/components/Navbar";
import { ResumeCard } from "~/components/ResumeCard";

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
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      const parsedResumes = resumes.map(
        (resume) => JSON.parse(resume.value) as Resume
      );

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="bg-main-pattern">
      <Navbar />

      <section className="lg:grid lg:h-screen lg:place-content-center">
        <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-prose text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Instantly analyze, improve, and{" "}
              <strong className="text-indigo-600"> perfect </strong> your resume
            </h1>

            {!loadingResumes && resumes?.length === 0 ? (
              <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                No resumes found. Upload a resume to get started.
              </p>
            ) : (
              <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
                Your personal career assistant, designed to help you stand out
                in a competitive job market. Reviews your resume in seconds,
                improve structure and keyword relevance. Get noticed by hiring
                managers and ATS systems alike.
              </p>
            )}
          </div>

          {loadingResumes && (
            <div className="flex flex-col items-center justify-center">
              <img
                src="/images/resume-scan-2.gif"
                alt="resume scan"
                className="w-[200px]"
              />
            </div>
          )}

          {!loadingResumes && resumes.length > 0 && (
            <div className="resumes-section">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          )}

          {!loadingResumes && resumes?.length === 0 && (
            <div className="mt-4 flex justify-center gap-4 sm:mt-6">
              <Link
                to="/upload"
                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
