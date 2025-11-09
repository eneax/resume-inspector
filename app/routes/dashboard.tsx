import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/home";

import { usePuterStore } from "~/lib/puter";

import { Navbar } from "~/components/Navbar";
import { ResumeCard } from "~/components/ResumeCard";
import { Loading } from "~/components/Loading";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Inspector | Dashboard" },
    {
      name: "description",
      content: "Get insights into your resume and land your dream job!",
    },
  ];
}

export default function Dashboard() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/dashboard");
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

      <section>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Resumes
            </h2>

            <p className="mt-4 max-w-md text-gray-500">
              Manage and review your uploaded resumes all in one place.
            </p>
          </header>

          {!loadingResumes && resumes.length > 0 && (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </ul>
          )}

          {loadingResumes && <Loading />}
        </div>
      </section>
    </main>
  );
}
