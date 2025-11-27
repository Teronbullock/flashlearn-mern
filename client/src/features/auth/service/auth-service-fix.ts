import { apiRequest } from "@lib/api";

interface PostNewUserParams {
  userEmail: string;
  userPass: string;
  userPassConfirm: string;
}

export const postNewUser = async ({
  userEmail,
  userPass,
  userPassConfirm,
}: PostNewUserParams) => {
  const res = await apiRequest({
    method: "post",
    url: "/auth/register",
    data: {
      user_email: userEmail,
      user_pass: userPass,
      user_pass_confirm: userPassConfirm,
    },
  });

  return res;
};
