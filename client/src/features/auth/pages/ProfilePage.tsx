import { useState } from "react";
import { CTASplitLayout } from "@components/layout/cta-split";
import { Button } from "@components/ui/button";
import data from "@content/profilePage.json";
import { useProfileForm, useGetProfile } from "../hooks/";
import {
  ChangeEmailAddress,
  ChangePassword,
  RemoveAccount,
} from "../components/index";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { Main } from "@components/layout/main/Main";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<
    "email" | "password" | "removeAccount"
  >("email");

  const { token } = useAuthContext();
  const { dispatch } = useProfileForm({ token });

  useGetProfile(dispatch, token);

  return (
    <Main className="main main--profile-page min-h-screen">
      <CTASplitLayout {...data}>
        <div className="mb-10 flex md:mb-6">
          <Button
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
          </Button>
          <Button
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
          </Button>
          <Button
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
          </Button>
        </div>
        {activeTab === "email" ? (
          <ChangeEmailAddress />
        ) : activeTab === "password" ? (
          <ChangePassword />
        ) : (
          <RemoveAccount />
        )}
        {/* </CTASplitForm> */}
      </CTASplitLayout>
    </Main>
  );
};

export default ProfilePage;
