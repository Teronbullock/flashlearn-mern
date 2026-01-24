import { apiRequest } from "@lib/api";

interface BaseFetchProps {
  setId: string;
  token: string;
  signal: AbortSignal;
}

interface FetchCardProps extends BaseFetchProps {
  pageNum: string;
}

export const fetchCard = async ({
  setId,
  pageNum,
  token,
  signal,
}: FetchCardProps) => {
  const res = await apiRequest({
    url: `/set/${setId}/cards/?page=${pageNum}`,
    token,
    signal,
  });

  return res.data;
};
