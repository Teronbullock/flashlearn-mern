import { Dispatch } from "react";

type Action = {
  type: "LOGIN";
  payload: {
    userId: string;
    userSlug: string;
    token: string;
    tokenExpTime: Date;
  };
};

/**
 *  -- setUserAndToken --
 *
 *  This function sets the user ID, Token info and expiration date in the context and local storage
 *
 * @param dispatch
 * @param userId
 * @param userSlug
 * @param token
 * @returns
 */
export const setUserAndToken = (
  dispatch: Dispatch<Action>,
  userId: string,
  userSlug: string,
  token: string,
) => {
  // sets the token expiration time to 15 minutes
  const tokenExpTime = new Date(new Date().getTime() + 1000 * 60 * 15);

  if (!userSlug || !token || !tokenExpTime) {
    throw new Error("userSlug, token, and tokenExpTime are required");
  }

  // dispatch values to the context
  dispatch({
    type: "LOGIN",
    payload: {
      userId,
      userSlug,
      token,
      tokenExpTime,
    },
  });

  // set the token in the local storage
  localStorage.setItem(
    "flashlearn_userData",
    JSON.stringify({
      userId,
      userSlug,
      token,
      tokenExpTime: tokenExpTime.toISOString(),
    }),
  );

  return;
};

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
