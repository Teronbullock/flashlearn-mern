import { useState } from "react";
import { CTASplitForm, CTASplitLayout } from "@components/CTASplit";
import { Btn } from "@components/btn";
import data from "@content/profilePage.json";
import { useProfileForm } from "@feats/profile/hooks/index";
import { ChangeEmailAddress, ChangePassword } from "@feats/profile/components";
import { SectionHeader } from "@components/ui/header";

const ProfilePage = () => {
  const { state, dispatch, handleFormSubmit } = useProfileForm();
  const [activeTab, setActiveTab] = useState<"email" | "password">("email");

  const handleEmailChange = (value: string) => {
    dispatch({
      type: "ON_CHANGE",
      payload: { user_email: value },
    });
  };

  const handleOldPasswordChange = (value: string) => {
    dispatch({
      type: "ON_CHANGE",
      payload: { user_old_pass: value },
    });
  };

  const handleNewPasswordChange = (value: string) => {
    dispatch({
      type: "ON_CHANGE",
      payload: { user_pass: value },
    });
  };

  const handleConfirmPasswordChange = (value: string) => {
    dispatch({
      type: "ON_CHANGE",
      payload: { user_pass_confirm: value },
    });
  };

  return (
    <main className="main main--profile-page min-h-screen">
      <CTASplitLayout
        {...data}
        handleFormSubmit={handleFormSubmit}
        ctaBtnSize="md"
      >
        <SectionHeader
          showIcons={false}
          title={data.title}
          className={{ container: "mb-10" }}
        />
        <div className="mb-6 flex">
          <Btn
            className={`mr-2 ${activeTab === "email" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            type="button"
            variants={{ style: "btn", color: "primary", size: "sm" }}
            onClick={() => setActiveTab("email")}
          >
            Change Email
          </Btn>
          <Btn
            className={`ml-2 ${activeTab === "password" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            type="button"
            variants={{ style: "btn", color: "primary", size: "sm" }}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </Btn>
        </div>

        {activeTab === "email" ? (
          <ChangeEmailAddress
            email={state.user_email}
            onEmailChange={handleEmailChange}
          />
        ) : (
          <CTASplitForm>
            <ChangePassword
              oldPassword={state.user_old_pass}
              newPassword={state.user_pass}
              confirmPassword={state.user_pass_confirm}
              onOldPasswordChange={handleOldPasswordChange}
              onNewPasswordChange={handleNewPasswordChange}
              onConfirmPasswordChange={handleConfirmPasswordChange}
            />
          </CTASplitForm>
        )}
      </CTASplitLayout>
    </main>
  );
};

export default ProfilePage;
