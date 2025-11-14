import { apiRequest, ApiConfigProps } from "@lib/api";

interface BaseFetchProps {
  setId: string;
  apiConfig: ApiConfigProps;
}

interface FetchCardProps extends BaseFetchProps {
  pageNum: string;
}

export const fetchCard = async ({
  setId,
  pageNum,
  apiConfig,
}: FetchCardProps) => {
  const res = await apiRequest({
    url: `/api/set/${setId}/cards/?page=${pageNum}`,
    config: apiConfig,
  });

  return res.data;
};

export const fetchAllCardsInSet = async ({
  setId,
  apiConfig,
}: BaseFetchProps) => {
  const res = await apiRequest({
    url: `/api/set/${setId}`,
    config: apiConfig,
  });

  return res.data;
};
