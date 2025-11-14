export interface ApiConfigProps {
  headers: {
    authorization: string;
  };
  signal?: AbortSignal;
}

export const getApiConfig = (token?: string): ApiConfigProps => ({
  headers: {
    authorization: `Bearer ${token}`,
  },
});
