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
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.code === "ERR_CANCELED") {
        const abortError = new Error("Request was cancelled");
        abortError.name = "AbortError";
        throw abortError;
      }

      if (
        err.response?.status === 401 &&
        err.response?.data?.message === "Not authorized"
      ) {
        throw new Error(err.response.data.error || "Unauthorized");
      }

      if (err.response?.status === 400) {
        console.error(
          "API Helper Error: Bad request error:",
          err.response?.data?.error,
        );

        throw err.response?.data?.error || err.message;
      }

      console.error(
        "API Helper Error: unknown error type:",
        err.response?.data?.error,
      );

      throw new Error(err.response?.data?.error || err.message);
    } else {
      console.error("API Helper Error: unknown error type:", err);
      throw err;
    }
  }
};
