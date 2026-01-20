import { PageHeader } from "@components/layout/PageHeader";
import { BtnLink } from "@components/btn";
import { InfoSection } from "@components/layout/sections/InfoSection";
// import { FormLayout, FormGroup, FormInput } from "@components/forms";
import { useDashboardSets } from "@feats/dashboard/hooks/";
import { Main } from "@layouts/Main";
import data from "@content/dashboardPage.json";
import { DashboardSetFeed } from "@feats/dashboard/components";
import { EmptyPageState } from "@/components/ui/EmptyPageState";
import { Spinner } from "@components/ui/Spinner";

export const DashboardPage = () => {
  const { sets, deleteSetHandler, isLoadingSets } = useDashboardSets();
  const { header, setSection } = data;

  const InfoData = [
    {
      id: 1,
      number: sets?.length.toString(),
      copy: "Total Sets",
      icon: { src: "/assets/img/Sun.png", alt: "Sun Icon" },
    },
    {
      id: 2,
      number: "12",
      copy: "Cards Studied",
      icon: { src: "/assets/img/CardsThree.png", alt: "CardsThree Icon" },
    },
    {
      id: 3,
      number: "3",
      copy: "Study Streak",
      icon: { src: "/assets/img/Student-icon.png", alt: "Student Icon" },
    },
  ];

  if (isLoadingSets) {
    return <Spinner />;
  }

  return (
    <Main>
      {sets && sets.length > 0 ? (
        <>
          <PageHeader data={header}>
            {/* <FormLayout className={{ container: "w-[568px]" }} onSubmit={null}>
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
                  placeholder="Search for set"
                />
              </FormGroup>
            </FormLayout> */}
          </PageHeader>
          <InfoSection data={InfoData} />
          <section className="mb-8 flex flex-wrap justify-between">
            <h2 className="mb-3 md:mb-0">{setSection.title}</h2>
            <BtnLink
              to={`/set/add`}
              variants={{ style: "btn", color: "primary", size: "lg" }}
            >
              {setSection.buttonText}
            </BtnLink>
          </section>
          <DashboardSetFeed sets={sets} deleteSetHandler={deleteSetHandler} />
        </>
      ) : (
        sets && (
          <EmptyPageState
            img={{
              src: "/assets/img/Vector-person.webp",
              alt: "cartoon of a person with an empty box in their hands",
            }}
            title="Looks a little empty here"
            subTitle="Let’s fix that! Create your first flashcard set and start learning today."
            cta="Create Set"
            ctaURL="/set/add"
          />
        )
      )}
    </Main>
  );
};

export default DashboardPage;
