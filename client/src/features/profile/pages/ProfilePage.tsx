import { useState } from "react";
import { CTASplitForm, CTASplitLayout } from "@components/CTASplit";
import { Btn } from "@components/btn";
import data from "@content/profilePage.json";
import { useProfileForm } from "@feats/profile/hooks/index";
import {
  ChangeEmailAddress,
  ChangePassword,
  RemoveAccount,
} from "@feats/profile/components";
import { useGetProfile } from "@feats/profile/hooks";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { Main } from "@layouts/Main";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<
    "email" | "password" | "removeAccount"
  >("email");

  const { token } = useAuthContext();
  const {
    state,
    dispatch,
    handleEmailUpdateSubmit,
    handlePasswordUpdateSubmit,
    handleRemoveAccountSubmit,
  } = useProfileForm({ token });

  useGetProfile(dispatch, token);

  return (
    <Main className="main main--profile-page min-h-screen">
      <CTASplitLayout {...data}>
        <div className="mb-10 flex md:mb-6">
          <Btn
            className="mr-2"
            type="button"
            variants={{
              style: "btn",
              color: activeTab === "email" ? "outline-primary" : "secondary",
              size: "sm",
            }}
            onClick={() => setActiveTab("email")}
          >
            Change Email
          </Btn>
          <Btn
            className="ml-2"
            type="button"
            variants={{
              style: "btn",
              color: activeTab === "password" ? "outline-primary" : "secondary",
              size: "sm",
            }}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </Btn>
          <Btn
            className="ml-2"
            type="button"
            variants={{
              style: "btn",
              color:
                activeTab === "removeAccount" ? "outline-primary" : "secondary",
              size: "sm",
            }}
            onClick={() => setActiveTab("removeAccount")}
          >
            Remove Account
          </Btn>
        </div>

        <CTASplitForm
          handleFormSubmit={
            activeTab === "email"
              ? handleEmailUpdateSubmit
              : activeTab === "password"
                ? handlePasswordUpdateSubmit
                : handleRemoveAccountSubmit
          }
          ctaBtnSize="md"
          cta={
            activeTab === "email"
              ? "Update Email"
              : activeTab === "password"
                ? "Update Password"
                : "Remove Account"
          }
        >
          {activeTab === "email" ? (
            <ChangeEmailAddress dispatch={dispatch} state={state} />
          ) : activeTab === "password" ? (
            <ChangePassword dispatch={dispatch} state={state} />
          ) : (
            <RemoveAccount dispatch={dispatch} state={state} />
          )}
        </CTASplitForm>
      </CTASplitLayout>
    </Main>
  );
};

export default ProfilePage;
