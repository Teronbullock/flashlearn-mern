import { apiRequest } from "@lib/api/api-request";
import { AuthStateBase } from "@feats/auth/types";
import { type LoginType, type RegisterType, type UpdatePasswordType, type PasswordType } from "@flashlearn/schema-db";

export const authApi = {
  login: async (data: LoginType): Promise<AuthStateBase> => {
    const res = await apiRequest({
      url: "/auth/login",
      method: "post",
      data
    });

    if (!res.data || !res.data.token) {
      throw new Error("Login failed - no response data");
    }

    const { token } = res.data;
    const { userId, exp } = JSON.parse(atob(token.split(".")[1]));
    const tokenExpTime = new Date(exp * 1000);

    if (isNaN(tokenExpTime.getTime())) {
      throw new Error("Invalid token expiration time");
    }

    return { userId, token, tokenExpTime };
  },

  logout: async (): Promise<void> => {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Logout timeout")), 5000),
    );

    await Promise.race([
      apiRequest({
        url: "/auth/logout",
        method: "post",
      }),
      timeoutPromise,
    ]);
  },

  refreshToken: async (oldToken: string): Promise<AuthStateBase> => {
    const res = await apiRequest({
      url: "/auth/refresh",
      method: "post",
      token: oldToken,
    });

    if (!res.data || !res.data.token) {
      throw new Error("Refresh token failed - no response data");
    }
    const token = res.data.token;
    const { userId, exp } = JSON.parse(atob(token.split(".")[1]));

    const tokenExpTime = new Date(exp * 1000);

    if (!token || isNaN(tokenExpTime.getTime())) {
      throw new Error("Invalid refresh token response");
    }

    return { userId, token, tokenExpTime: tokenExpTime };
  },
  register: async (data: RegisterType) => {
    const res = await apiRequest({
      method: "post",
      url: "/auth/register",
      data
    });

    if (!res.data || !res.data.token) {
      throw new Error("Login failed - no response data");
    }

    const { token } = res.data;
    const { userId, exp } = JSON.parse(atob(token.split(".")[1]));
    const tokenExpTime = new Date(exp * 1000);

    if (isNaN(tokenExpTime.getTime())) {
      throw new Error("Invalid token expiration time");
    }

    return { userId, token, tokenExpTime };

  },
  updateEmail: async (data: LoginType, token: string, signal?: AbortSignal) => {
    return await apiRequest({
      method: "put",
      url: `/auth/update-email`,
      data,
      token,
      signal
    });
  },
  updatePassword: async (data: UpdatePasswordType, token: string, signal?: AbortSignal) => {
    return await apiRequest({
      method: "put",
      url: `/auth/update-password`,
      data,
      token,
      signal
    });
  },
  deleteAccount: async (data: PasswordType, token: string, signal?: AbortSignal) => {
    return await apiRequest({
      method: "put",
      url: `/auth/delete-account`,
      data,
      token,
      signal
    });
  }
};
