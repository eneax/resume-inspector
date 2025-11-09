import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/home";

import { usePuterStore } from "~/lib/puter";
import { formatSize } from "~/lib/utils";
import { Navbar } from "~/components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Inspector | Profile" },
    {
      name: "description",
      content: "Manage your profile and files.",
    },
  ];
}

export default function Profile() {
  const { auth, isLoading, error, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/profile");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    files.forEach(async (file) => {
      await fs.delete(file.path);
    });
    await kv.flush();
    loadFiles();
  };

  return (
    <main className="bg-main-pattern">
      <Navbar />

      {isLoading && (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <span className="size-3 animate-ping rounded-full bg-indigo-600" />
            <span className="size-3 animate-ping rounded-full bg-indigo-600 [animation-delay:0.2s]" />
            <span className="size-3 animate-ping rounded-full bg-indigo-600 [animation-delay:0.4s]" />
          </div>
        </div>
      )}

      {error && (
        <section>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header>
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Error: {error}
              </h2>
            </header>
          </div>
        </section>
      )}

      {!isLoading && !error && (
        <section>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <header>
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                {auth.user?.username}
              </h2>

              <p className="mt-4 max-w-md text-gray-500">
                Here is a list of your resumes.
              </p>

              <div className="flex flex-col gap-4 mt-10">
                <div className="flow-root">
                  <dl className="-my-3 divide-y divide-gray-200 rounded border border-gray-200 text-sm *:even:bg-gray-50">
                    {files.map((file) => (
                      <div
                        className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4"
                        key={file.id}
                      >
                        <dd className="font-medium text-gray-900">
                          {file.name}
                        </dd>
                        <dt className="text-gray-700 sm:col-span-2">
                          {file.size ? formatSize(file.size) : "0 Bytes"}
                        </dt>
                      </div>
                    ))}

                    {files.length === 0 && (
                      <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                        <dd className="font-medium text-gray-900">No files</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>

              {files.length > 0 && (
                <div className="mt-10">
                  <button
                    className="rounded-md bg-red-100 px-5 py-2.5 text-sm font-medium text-red-600 cursor-pointer"
                    onClick={() => handleDelete()}
                  >
                    Delete All Files
                  </button>
                </div>
              )}
            </header>
          </div>
        </section>
      )}
    </main>
  );
}
