export const Details = ({
  suggestions,
  feedback,
}: {
  suggestions: { type: "good" | "improve"; tip: string }[];
  feedback: Feedback;
}) => {
  return (
    <>
      {/* Suggestions */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="col-span-1">
            <h2 className="text-3xl/tight font-bold text-gray-900 sm:text-4xl">
              Overview
            </h2>

            <p className="mt-4 text-lg text-pretty text-gray-700">
              Your personalized resume feedback.
            </p>
          </div>

          <div className="space-y-6">
            {suggestions.map((suggestion, index) => (
              <div className="flex items-start gap-4" key={index}>
                <div className="shrink-0 rounded-lg bg-gray-50 p-3 text-gray-700">
                  <img
                    src={
                      suggestion.type === "good"
                        ? "/icons/check.svg"
                        : "/icons/warning.svg"
                    }
                    alt="Suggestion"
                    className="w-8 h-8"
                  />
                </div>

                <div>
                  <p className="mt-1 text-gray-700">{suggestion.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <span className="flex items-center pt-16">
          <span className="h-px flex-1 bg-gray-50"></span>
        </span>
      </div>

      {/* Tone and Style */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="col-span-1">
            <h2 className="text-3xl/tight font-bold text-gray-900 sm:text-4xl">
              Tone and Style
            </h2>

            <p className="mt-4 text-lg text-pretty text-gray-700">
              Your resume tone and style.
            </p>
          </div>

          <div className="space-y-6">
            {feedback.toneAndStyle.tips.map((tip, index) => (
              <div className="flex items-start gap-4" key={index}>
                <div className="shrink-0 rounded-lg bg-gray-50 p-3 text-gray-700">
                  <img
                    src={
                      tip.type === "good"
                        ? "/icons/check.svg"
                        : "/icons/warning.svg"
                    }
                    alt="Suggestion"
                    className="w-8 h-8"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tip.tip}
                  </h3>

                  <p className="mt-1 text-gray-700">{tip.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <span className="flex items-center pt-16">
          <span className="h-px flex-1 bg-gray-50"></span>
        </span>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="col-span-1">
            <h2 className="text-3xl/tight font-bold text-gray-900 sm:text-4xl">
              Content
            </h2>

            <p className="mt-4 text-lg text-pretty text-gray-700">
              Your resume content.
            </p>
          </div>

          <div className="space-y-6">
            {feedback.content.tips.map((tip, index) => (
              <div className="flex items-start gap-4" key={index}>
                <div className="shrink-0 rounded-lg bg-gray-50 p-3 text-gray-700">
                  <img
                    src={
                      tip.type === "good"
                        ? "/icons/check.svg"
                        : "/icons/warning.svg"
                    }
                    alt="Suggestion"
                    className="w-8 h-8"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tip.tip}
                  </h3>

                  <p className="mt-1 text-gray-700">{tip.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <span className="flex items-center pt-16">
          <span className="h-px flex-1 bg-gray-50"></span>
        </span>
      </div>

      {/* Structure */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="col-span-1">
            <h2 className="text-3xl/tight font-bold text-gray-900 sm:text-4xl">
              Structure
            </h2>

            <p className="mt-4 text-lg text-pretty text-gray-700">
              Your resume structure.
            </p>
          </div>

          <div className="space-y-6">
            {feedback.structure.tips.map((tip, index) => (
              <div className="flex items-start gap-4" key={index}>
                <div className="shrink-0 rounded-lg bg-gray-50 p-3 text-gray-700">
                  <img
                    src={
                      tip.type === "good"
                        ? "/icons/check.svg"
                        : "/icons/warning.svg"
                    }
                    alt="Suggestion"
                    className="w-8 h-8"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tip.tip}
                  </h3>

                  <p className="mt-1 text-gray-700">{tip.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <span className="flex items-center pt-16">
          <span className="h-px flex-1 bg-gray-50"></span>
        </span>
      </div>

      {/* Skills */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="col-span-1">
            <h2 className="text-3xl/tight font-bold text-gray-900 sm:text-4xl">
              Skills
            </h2>

            <p className="mt-4 text-lg text-pretty text-gray-700">
              Your resume skills.
            </p>
          </div>

          <div className="space-y-6">
            {feedback.skills.tips.map((tip, index) => (
              <div className="flex items-start gap-4" key={index}>
                <div className="shrink-0 rounded-lg bg-gray-50 p-3 text-gray-700">
                  <img
                    src={
                      tip.type === "good"
                        ? "/icons/check.svg"
                        : "/icons/warning.svg"
                    }
                    alt="Suggestion"
                    className="w-8 h-8"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tip.tip}
                  </h3>

                  <p className="mt-1 text-gray-700">{tip.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
