import { AxiosError } from "axios";
import { apiClient } from "@lib/api/axios-instance";

interface ApiRequestProps {
  method?: "get" | "post" | "put" | "delete";
  url: string;
  data?: object;
  token?: string;
  signal?: AbortSignal;
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
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === "ERR_CANCELED") {
        const abortError = new Error("Request was cancelled");
        abortError.name = "AbortError";
        throw abortError;
      }

      if (
        error.response?.status === 401 &&
        error.response?.data?.message === "Not authorized"
      ) {
        throw new Error(error.response.data.error || "Unauthorized");
      }

      throw new Error(error.response?.data?.error || error.message);
    } else {
      console.error(
        "API Helper: Encountered unhandled or unknown error type:",
        error,
      );
      throw error;
    }
  }
};
