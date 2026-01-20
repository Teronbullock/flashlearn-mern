interface SpinnerProps {
  message?: string;
}

export const Spinner = ({ message }: SpinnerProps) => {
  return (
    <div
      className="flex h-screen flex-col items-center justify-center gap-4"
      role="status"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
      <span className="sr-only">Loading...</span>
      <p>{message ?? "Loading..."}</p>
    </div>
  );
};
