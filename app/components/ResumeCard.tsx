import { useEffect, useState } from "react";
import { Link } from "react-router";

import { usePuterStore } from "~/lib/puter";

export const ResumeCard = ({ resume }: { resume: Resume }) => {
  const [resumeUrl, setResumeUrl] = useState("");
  const { fs } = usePuterStore();

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(resume.imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [resume.imagePath]);

  return (
    <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-xs">
      {resumeUrl && (
        <img alt="" src={resumeUrl} className="h-56 w-full object-cover" />
      )}

      <div className="p-4 sm:p-6">
        {resume.companyName ? (
          <h3 className="text-lg font-medium text-gray-900">
            {resume.companyName}
          </h3>
        ) : (
          <h3 className="text-lg font-medium text-gray-900">Resume</h3>
        )}

        {resume.jobTitle ? (
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
            {resume.jobTitle}
          </p>
        ) : (
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
            Job post not specified
          </p>
        )}

        <Link
          to={`/resume/${resume.id}`}
          className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
        >
          Find out more
          <span
            aria-hidden="true"
            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
};
