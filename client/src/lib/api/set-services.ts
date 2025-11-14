import { apiRequest, ApiConfigProps } from "@lib/api";

interface AllSetProps {
  userSlug: string;
  signal: AbortSignal;
  apiConfig: ApiConfigProps;
}

export const fetchAllSets = async ({
  userSlug,
  signal,
  apiConfig,
}: AllSetProps) => {
  if (!userSlug) return;

  apiConfig["signal"] = signal;

  const res = await apiRequest({
    url: `/api/set/user/${userSlug}`,
    config: apiConfig,
  });
  return res.data;
};
