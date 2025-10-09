import { useParams } from "react-router-dom";
import { SetFeed, DashboardInfo } from "./components";
import { InnerPageHeader } from "@components/InnerPageHeader";
import useManageSetData from "@pages/dashboard/hooks/useManageSetData";
import { FormLayout, FormGroup, FormInput } from "@components/forms";
import { Main } from "@layouts/Main";
import { BtnLink } from "@components/btn";
import data from "@content/dashboardPage.json";
import { useAuthContext } from "@hooks/useAuthContext";
import { useDashboard } from "./hooks/useDashboard";

// import { Btn } from "@components/btn";

const Dashboard = () => {
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
    <Main>
      {sets && sets.length > 0 ? (
        <>
          <InnerPageHeader data={header}>
            <FormLayout className={{ container: "w-[568px]" }} onSubmit={null}>
              <FormGroup name="search-bar" className={{ group: "relative" }}>
                <img
                  src="/assets/img/Vector-finder.png"
                  alt="icon of a magnifying glass"
                  width="19px"
                  height="19px"
                  className="absolute left-4 top-[35%]"
                />
                <FormInput
                  className="bg-light w-full !py-[0.55rem] !pl-11 placeholder:text-sm"
                  name="search-bar"
                  onChange={null}
                  placeholder="Search for sets"
                />
              </FormGroup>
            </FormLayout>
          </InnerPageHeader>
          <DashboardInfo data={dashInfoData} />
          <section className="mb-8 flex flex-wrap justify-between">
            <h2 className="mb-3 md:mb-0">{setSection.title}</h2>
            <BtnLink
              to={`/set/user/${userSlug}/add`}
              variants={{ style: "btn", color: "primary", size: "lg" }}
            >
              {setSection.buttonText}
            </BtnLink>
          </section>
          <SetFeed sets={sets} deleteSetHandler={deleteSetHandler} />
        </>
      ) : (
        <div>
          <div className="mb-10 flex justify-center">
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
            <BtnLink
              to={`/set/user/${userSlug}/add`}
              className="w-[444px] !py-3 !text-base"
              variants={{ style: "btn", color: "primary", size: "lg" }}
            >
              Create Set
            </BtnLink>
          </div>
        </div>
      )}
    </Main>
  );
};

export default Dashboard;
