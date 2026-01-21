export const InputError = ({ messages }: { messages?: string[] }) => {
  if (!messages || messages.length === 0) return null;
  return <span className="mt-1 block text-xs text-red-500">{messages[0]}</span>;
};
