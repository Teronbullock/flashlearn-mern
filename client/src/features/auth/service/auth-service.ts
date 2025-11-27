import { apiRequest } from "@lib/api/api-request";
import { AuthStateBase } from "@feats/auth/types";

export const authApi = {
  login: async (email: string, password: string): Promise<AuthStateBase> => {
    const res = await apiRequest({
      url: "/auth/login",
      method: "post",
      data: {
        user_email: email,
        user_pass: password,
      },
    });

    const { userId, userSlug, token, tokenExpTime } = res.data;

    if (!token) {
      throw new Error("Login failed - no token received");
    }

    const expTime = new Date(tokenExpTime);
    if (isNaN(expTime.getTime())) {
      throw new Error("Invalid token expiration time");
    }

    return { userId, userSlug, token, tokenExpTime: expTime };
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

  refreshToken: async (
    userId: string,
    token: string,
  ): Promise<AuthStateBase> => {
    const res = await apiRequest({
      url: "/auth/refresh",
      method: "post",
      data: { userId },
      token,
    });

    const { userSlug, token: newToken, tokenExpTime } = res.data;
    const expTime = new Date(tokenExpTime);

    if (!newToken || isNaN(expTime.getTime())) {
      throw new Error("Invalid refresh token response");
    }

    return { userId, userSlug, token: newToken, tokenExpTime: expTime };
  },
};
