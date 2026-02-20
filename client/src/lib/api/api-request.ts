import { AxiosError } from "axios";
import { apiClient } from "@lib/api/axios-instance";

interface ApiRequestProps {
  method?: "get" | "post" | "put" | "delete";
  url: string;
  data?: object;
  token?: string;
  signal?: AbortSignal;
}

export interface ApiErrorObject {
  code: string;
  message: string;
  details?: Record<string, string[]> | null;
}

/**
 * ## API Request Function
 *
 * Executes a configured asynchronous API request using Axios.
 * Handles production URL routing, API configuration, and specific error conditions (401, request cancellation).
 *
 *
 * @example
 * // Make a GET request to retrieve user data
 * const res = await apiRequest({
 * method: 'get',
 * url: '/api/set/user/1',
 * data: { id: 1 },
 * });
 */
export const apiRequest = async ({
  method = "get",
  url,
  data,
  token,
  signal,
}: ApiRequestProps) => {
  try {
    const res = await apiClient.request({
      method,
      url,
      data,
      ...(token && {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      ...(signal && { signal }),
    });

    if (!res.data) {
      throw new Error("API: No data founded");
    }
    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.code === "ERR_CANCELED") {
        const abortError = new Error("Request was cancelled");
        abortError.name = "AbortError";
        throw abortError;
      }

      if (err.response?.data?.error) {
        console.error("API Helper Response Error:", err.response.data.error);
        throw err.response.data.error;
      }

      const fallbackMessage =
        err.response?.data?.message || err.message || "Unknown Error";

      console.error("API Helper Unknown Error:", fallbackMessage);
      throw new Error(fallbackMessage);
    } else {
      console.error("API Helper Error:", err);
      throw err;
    }
  }
};
