import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import { usePuterStore } from "~/lib/puter";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";

import { Navbar } from "~/components/Navbar";
import { FileUploader } from "~/components/FileUploader";

export function meta() {
  return [
    { title: "Resume Inspector | Upload" },
    {
      name: "description",
      content:
        "Upload your resume to get detailed feedback tailored to your job application.",
    },
  ];
}

export default function Upload() {
  const navigate = useNavigate();
  const { fs, ai, kv } = usePuterStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusMessage("Uploading your resume ...");

    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusMessage("Error: Failed to upload file.");

    setStatusMessage("Converting to image ...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file)
      return setStatusMessage("Error: Failed to convert PDF to image.");

    setStatusMessage("Uploading the image ...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage)
      return setStatusMessage("Error: Failed to upload image file.");

    setStatusMessage("Preparing data ...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusMessage("Analyzing your resume ...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );
    if (!feedback)
      return setStatusMessage("Error: Failed to analyze your resume.");

    let feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    feedbackText = feedbackText
      .replace(/^```json\s*/i, "")
      .replace(/```$/, "")
      .trim();

    try {
      data.feedback = JSON.parse(feedbackText);
    } catch {
      data.feedback = feedbackText;
    }

    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusMessage("Analysis complete! Redirecting ...");
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget.closest("form");
    if (!form) return;

    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-main-pattern">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="md:py-4">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Get feedback on your resume
            </h2>

            <p className="mt-4 text-pretty text-gray-700">
              Choose one of the options below to receive tailored feedback that
              helps you land your dream job:
            </p>

            <ol className="mt-6 space-y-2 text-left">
              <li className="flex items-center gap-2">
                <span className="grid size-6 shrink-0 place-content-center rounded-full bg-indigo-600 text-sm font-medium text-white">
                  1
                </span>

                <span className="text-sm text-gray-700">
                  Fill out the form and upload your resume → Get a job-specific
                  feedback report.
                </span>
              </li>

              <li className="flex items-center gap-2">
                <span className="grid size-6 shrink-0 place-content-center rounded-full bg-indigo-600 text-sm font-medium text-white">
                  2
                </span>

                <span className="text-sm text-gray-700">
                  Upload only your resume → Get general feedback on your resume.
                </span>
              </li>
            </ol>
          </div>

          {!isProcessing ? (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6"
            >
              <div className="flex flex-col gap-2 w-full items-start">
                <label
                  className="block text-sm font-medium text-gray-900"
                  htmlFor="company-name"
                >
                  Company Name
                </label>

                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none p-2 bg-white"
                  id="company-name"
                  type="text"
                  placeholder="Company you are applying to ..."
                />
              </div>

              <div className="flex flex-col gap-2 w-full items-start">
                <label
                  className="block text-sm font-medium text-gray-900"
                  htmlFor="job-title"
                >
                  Job Title
                </label>

                <input
                  className="mt-1 w-full rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none p-2 bg-white"
                  id="job-title"
                  type="text"
                  placeholder="Position you are applying for ..."
                />
              </div>

              <div className="flex flex-col gap-2 w-full items-start">
                <label
                  className="block text-sm font-medium text-gray-900"
                  htmlFor="job-description"
                >
                  Job Description
                </label>

                <textarea
                  className="mt-1 w-full resize-none rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none p-2 bg-white"
                  id="job-description"
                  rows={5}
                  placeholder="Paste the job description here"
                ></textarea>
              </div>

              <div className="flex flex-col gap-2 w-full items-start">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>

              <button
                className="block w-full rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600 cursor-pointer"
                type="submit"
              >
                Analyze Resume
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 md:py-4">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {statusMessage}
              </h2>
              <img
                src="/images/resume-scan.gif"
                alt="Loading"
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
