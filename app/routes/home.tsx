import type { Route } from "./+types/home";
import { resumes } from "../../constants";
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
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications & Resume Performance</h1>
          <h2>Get insights into your resume and land your dream job!</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
