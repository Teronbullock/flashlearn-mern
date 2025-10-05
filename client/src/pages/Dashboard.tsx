import { useParams } from "react-router-dom";
import { SetFeed } from "@features/sets/SetFeed";
import { useAuthContext } from "@hooks/useAuthContext";
import { DashboardHeader } from "@layouts/DashboardHeader";
import { useDashboard } from "@hooks/useDashboard";
import { Btn } from "@components/Btn/Btn";
import data from "@content/dashboardPage.json";

// import { Btn } from "@components/Btn/Btn";

export const Dashboard = () => {
  // const {} = useDashboard();

  const { userSlug } = useParams();

  const { header, setSection } = data;

  return (
    <main className="main main-dashboard-page h-screen py-12">
      <div className="w-8xl mx-auto mt-10 px-4">
        <DashboardHeader data={header} onChange="" onSubmit="" />
        <section className="mb-8 flex justify-between">
          <h2>{setSection.title}</h2>
          <Btn
            el="link"
            to="/"
            variants={{ style: "btn", color: "primary", size: "lg" }}
          >
            {setSection.buttonText}
          </Btn>
        </section>
        <SetFeed />
      </div>
    </main>
  );
};
