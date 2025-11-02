import type { Route } from "./+types/home";

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
      <section className="main-section">
        <div className="page-heading">
          <h1>Track Your Applications & Resume Performance</h1>
          <h2>Get insights into your resume and land your dream job!</h2>
        </div>
      </section>
    </main>
  );
}
