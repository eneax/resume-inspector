export const Loading = () => (
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="flex items-center justify-center gap-2">
      <span className="size-3 animate-ping rounded-full bg-indigo-600" />
      <span className="size-3 animate-ping rounded-full bg-indigo-600 [animation-delay:0.2s]" />
      <span className="size-3 animate-ping rounded-full bg-indigo-600 [animation-delay:0.4s]" />
    </div>
  </div>
);
