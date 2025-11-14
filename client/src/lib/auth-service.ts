import { apiRequest } from "@/lib/api/api-request";

// type Action = {
//   type: "LOGIN";
//   payload: {
//     userId: string;
//     userSlug: string;
//     token: string;
//     tokenExpTime: Date;
//   };
// };

export const checkPageAuth = (
  userSlug: string | null | undefined,
  pageUserSlug: string | string | null | undefined,
): boolean => {
  if (!userSlug || !pageUserSlug) {
    return false;
  }

  if (userSlug !== pageUserSlug) {
    console.log("Unauthorized Access");
    return false;
  }

  return true;
};

export const loginUser = async (userEmail: string, userPass: string) => {
  if (!userEmail || !userPass) {
    throw new Error("Email and password are required");
  }

  try {
    const res = await apiRequest({
      url: "/api/user/login",
      method: "post",
      data: {
        user_email: userEmail,
        user_pass: userPass,
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = async () => {
  try {
    const res = await apiRequest({
      url: "/api/user/logout",
      method: "post",
    });

    if (res.status === 200) {
      console.log("User logged out successfully");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error loggin out user from backend: " + error.message);
    } else {
      console.error(error);
    }
  }
};

export const getRefreshAuthToken = async (userId: string, token: string) => {
  try {
    const res = await apiRequest({
      url: "/api/user/refresh",
      method: "post",
      data: { userId },
      config: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });

    if (res.status !== 200) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.data;
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};
