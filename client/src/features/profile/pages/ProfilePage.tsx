import { useState } from "react";
import { CTASplitForm, CTASplitLayout } from "@components/CTASplit";
import { Btn } from "@components/btn";
import data from "@content/profilePage.json";
import { useProfileForm } from "@feats/profile/hooks/index";
import { ChangeEmailAddress, ChangePassword } from "@feats/profile/components";
import { useGetProfile } from "@feats/profile/hooks";
import { useAuthContext } from "@feats/auth/context/AuthContext";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<"email" | "password">("email");

  const { token } = useAuthContext();
  const {
    state,
    dispatch,
    handleEmailUpdateSubmit,
    handlePasswordUpdateSubmit,
  } = useProfileForm({ token });

  useGetProfile(dispatch, token);

  return (
    <main className="main main--profile-page min-h-screen">
      <CTASplitLayout {...data}>
        <div className="mb-6 flex">
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
              color: activeTab === "email" ? "secondary" : "outline-primary",
              size: "sm",
            }}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </Btn>
        </div>

        <CTASplitForm
          handleFormSubmit={
            activeTab === "email"
              ? handleEmailUpdateSubmit
              : handlePasswordUpdateSubmit
          }
          ctaBtnSize="md"
          cta={activeTab === "email" ? "Update Email" : "Update Password"}
        >
          {activeTab === "email" ? (
            <ChangeEmailAddress dispatch={dispatch} state={state} />
          ) : (
            <ChangePassword dispatch={dispatch} state={state} />
          )}
        </CTASplitForm>
      </CTASplitLayout>
    </main>
  );
};

export default ProfilePage;
