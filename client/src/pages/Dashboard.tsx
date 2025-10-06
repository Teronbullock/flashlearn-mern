import { useParams } from "react-router-dom";
import { SetFeed } from "@features/sets/SetFeed";
import { DashboardHeader } from "@features/dashboard/DashboardHeader";
import { DashboardInfo } from "@features/dashboard/DashboardInfo";
import { Btn } from "@components/Btn/Btn";
import data from "@content/dashboardPage.json";
import { useAuthContext } from "@hooks/useAuthContext";
import { useDashboard } from "@hooks/useDashboard";
import useManageSetData from "@features/sets/hooks/useManageSetData";

// import { Btn } from "@components/Btn/Btn";

export const Dashboard = () => {
  // const {} = useDashboard();
  const { sets, deleteSetHandler } = useManageSetData({ isGetSets: true });

  const { userSlug } = useParams();

  const { header, setSection } = data;
  const dashInfoData = [
    {
      number: sets.length.toString(),
      copy: "Total Sets",
      icon: { src: "/assets/img/Sun.png", alt: "Sun Icon" },
    },
    {
      number: 12,
      copy: "Cards Studied",
      icon: { src: "/assets/img/CardsThree.png", alt: "CardsThree Icon" },
    },
    {
      number: 3,
      copy: "Study Streak",
      icon: { src: "/assets/img/Student-icon.png", alt: "Student Icon" },
    },
  ];

  return (
    <main className="main main-dashboard-page mb-8 h-screen py-12">
      <div className="max-w-8xl mx-auto px-4 md:mt-10">
        {sets && sets.length > 0 ? (
          <>
            <DashboardHeader data={header} onChange="" onSubmit="" />
            <DashboardInfo data={dashInfoData} />
            <section className="mb-8 flex flex-wrap justify-between">
              <h2 className="mb-3 md:mb-0">{setSection.title}</h2>
              <Btn
                el="link"
                to={`/set/user/${userSlug}/add`}
                variants={{ style: "btn", color: "primary", size: "lg" }}
              >
                {setSection.buttonText}
              </Btn>
            </section>
            <SetFeed sets={sets} deleteSetHandler={deleteSetHandler} />
          </>
        ) : (
          <div>
            <div className="mt-27 mb-10 flex justify-center">
              <img
                src="/assets/img/vector-person.webp"
                alt="cartoon of a person with an empty box in their hands"
                width="560"
                height="570"
              />
            </div>
            <h2 className="mb-2 text-center font-medium">
              Looks a little empty here
            </h2>
            <p className="mb-15 text-center text-base">
              Let’s fix that! Create your first flashcard set and start learning
              today.
            </p>
            <div className="text-center">
              <Btn
                el="link"
                to={`/set/user/${userSlug}/add`}
                className="w-[444px] !py-3 !text-base"
                variants={{ style: "btn", color: "primary", size: "lg" }}
              >
                Create Set
              </Btn>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
