import { apiRequest } from "@lib/api/api-request";
import { AuthStateBase, PostNewUserParams } from "@feats/auth/types";

export const authApi = {
  login: async (email: string, password: string): Promise<AuthStateBase> => {
    const res = await apiRequest({
      url: "/auth/login",
      method: "post",
      data: {
        email: email,
        pass: password,
      },
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
  postNewUser: async ({ email, pass, passConfirm }: PostNewUserParams) => {
    const res = await apiRequest({
      method: "post",
      url: "/auth/register",
      data: {
        email: email,
        pass: pass,
        pass_confirm: passConfirm,
      },
    });

    return res;
  },
};
