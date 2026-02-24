import { PageHeader } from "@components/layout/PageHeader";
import { BtnLink } from "@components/btn";
import { InfoSection } from "@components/layout/sections/InfoSection";
import { useFetchSet } from "@feats/sets/hooks/use-fetch-set";
import { Main } from "@layouts/Main";
import data from "@content/dashboardPage.json";
import { ResourceFeed } from "@components/resource-feed";
import { EmptyPageState } from "@components/ui/EmptyPageState";
import { Spinner } from "@components/ui/Spinner";
import { useDeleteSet } from "@feats/sets/hooks/use-delete-set";
import {
  ListCard,
  ListCardContent,
  ListCardSetActions,
} from "@components/list-card";
import { Form } from "@components/forms";

export const DashboardPage = () => {
  const { sets, isLoading, fetchSetResource } = useFetchSet({});
  const { deleteHandler } = useDeleteSet(fetchSetResource);
  const { header, setSection } = data;

  const InfoData = [
    {
      id: 1,
      number: sets?.length.toString(),
      copy: "Total Sets",
      icon: { src: "public/assets/img/Sun.png", alt: "Sun Icon" },
    },
    // {
    //   id: 2,
    //   number: "12",
    //   copy: "Cards Studied",
    //   icon: { src: "/assets/img/CardsThree.png", alt: "CardsThree Icon" },
    // },
    // {
    //   id: 3,
    //   number: "3",
    //   copy: "Study Streak",
    //   icon: { src: "/assets/img/Student-icon.png", alt: "Student Icon" },
    // },
  ];

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Main>
      {sets && sets.length > 0 ? (
        <>
          <PageHeader data={header}>
            {/* <Form className={{ container: "w-[568px]" }} onSubmit={null}>
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
            </Form> */}
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
          <ResourceFeed
            resourceInfo={sets}
            renderActions={(resource) => (
              <ListCard {...resource} key={resource.id}>
                <Form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await deleteHandler(resource.id);
                  }}
                >
                  <ListCardContent {...resource} feedType="set" />
                  <ListCardSetActions id={resource.id} />
                </Form>
              </ListCard>
            )}
          />
        </>
      ) : (
        sets && (
          <EmptyPageState
            img={{
              src: "public/assets/img/Vector-person.webp",
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
