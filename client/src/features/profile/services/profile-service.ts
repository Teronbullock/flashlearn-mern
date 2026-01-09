import { apiRequest } from "@/lib/api/api-request";

// Interface for updateEmail parameters
interface UpdateEmailParams {
  userSlug: string;
  email: string;
  oldPassword: string;
  token: string | null;
}

// Interface for updateProfile parameters
interface UpdateProfileParams extends UpdateEmailParams {
  newPassword: string;
  confirmPassword: string;
}

export const updateEmail = async ({
  userSlug,
  email,
  oldPassword,
  token,
}: UpdateEmailParams) => {
  if (false) {
    throw new Error("auth not included");
  }

  const res = await apiRequest({
    method: "put",
    url: `/auth/${userSlug}/profile`,
    data: {
      user_email: email,
      user_Old_pass: oldPassword,
    },
    token: token,
  });

  return res;
};

export const updateProfile = async ({
  userSlug,
  email,
  newPassword,
  oldPassword,
  confirmPassword,
  token,
}: UpdateProfileParams) => {
  const res = await apiRequest({
    method: "put",
    url: `/auth/${userSlug}/profile`,
    data: {
      user_email: email,
      user_pass: newPassword,
      user_old_pass: oldPassword,
      user_pass_confirm: confirmPassword,
    },
    token: token,
  });

  return res;
};
