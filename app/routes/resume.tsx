import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { usePuterStore } from "~/lib/puter";

import { Navbar } from "~/components/Navbar";
import Details from "~/components/Details";
import { Loading } from "~/components/Loading";

export function meta() {
  return [
    { title: "Resume Inspector | Feedback" },
    {
      name: "description",
      content: "Detailed and personalized feedback for your resume.",
    },
  ];
}

const Resume = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth, isLoading, fs, kv } = usePuterStore();

  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;
      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
    };

    loadResume();
  }, [id]);

  return (
    <main className="bg-main-pattern">
      <Navbar />

      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Resume Feedback
            </h2>

            <p className="mx-auto mt-4 max-w-md text-gray-500">
              Review your resume and get personalized feedback.
            </p>
          </header>
        </div>
      </section>

      {feedback ? (
        <Details suggestions={feedback.ATS.tips || []} feedback={feedback} />
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Resume;
