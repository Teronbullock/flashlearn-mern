import { useParams } from "react-router-dom";
import { ResourceFeed } from "@components/display/resource-feed/ResourceFeed";
import { EmptyPageState } from "@components/ui/empty-page-state/EmptyPageState";
import { PageHeader } from "@components/layout/page-header/PageHeader";
import { ButtonLink } from "@components/ui/button";
import { InfoSection } from "@components/display/info-section/InfoSection";
import { Spinner } from "@components/ui/spinner/Spinner";
import { Main } from "@components/layout/main/Main";
import { useDeleteCard } from "@feats/card/hooks/use-delete-card";
import {
  ListCardContent,
  ListCardCardActions,
  ListCard,
} from "@components/display/list-card";

import { useFetchCards } from "@feats/card/hooks/use-fetch-card";
import data from "@content/setContent.json";

import { Form } from "@components/form";

const SetPage = () => {
  const { setId } = useParams();
  setId?.toString();

  const { cards, isLoading, fetchCardResource } = useFetchCards({ setId });
  const { deleteHandler } = useDeleteCard(fetchCardResource);

  const { setPage } = data;
  setPage.infoData[0]["number"] = cards ? cards.length.toString() : "0";

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Main>
      {cards && cards.length > 0 ? (
        <>
          <PageHeader data={{ title: "Set Page" }}>
            {/* <Form className={{ container: "w-[568px]" }} onSubmit={null}>
              <FormGroup htmlFor="search-bar" className={{ group: "relative" }}>
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
                  placeholder="Search for card"
                />
              </FormGroup>
            </Form> */}
          </PageHeader>
          <div>
            <p>{}</p>
          </div>
          <InfoSection data={setPage.infoData} />

          <section className="mb-8 flex flex-wrap justify-between">
            <h2 className="mb-3 md:mb-0">Study Cards</h2>
            <div>
              <ButtonLink
                className="md:mr-4"
                to={`/set/${setId}/card/add`}
                variants={{ style: "btn", color: "primary", size: "lg" }}
              >
                Create New Card
              </ButtonLink>
              {cards && (
                <ButtonLink
                  variants={{
                    style: "btn",
                    color: "outline-primary",
                    size: "lg",
                  }}
                  to={`/set/${setId}/cards/?page=1`}
                >
                  View Cards
                </ButtonLink>
              )}
            </div>
          </section>
          <ResourceFeed
            resourceInfo={cards}
            renderActions={(resource) => (
              <ListCard {...resource} key={resource.id}>
                <Form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await deleteHandler({
                      cardId: resource.id,
                      setId: resource.setId,
                    });
                  }}
                >
                  <ListCardContent
                    {...resource}
                    title={resource.term}
                    description={resource.definition}
                  />
                  <ListCardCardActions cardId={resource.id} setId={setId} />
                </Form>
              </ListCard>
            )}
          />
        </>
      ) : (
        setId && (
          <div className="pt-20">
            <EmptyPageState
              img={{
                src: "/assets/img/book-glasses.png",
                alt: "cartoon of glasses with a book",
              }}
              title="No cards yet"
              subTitle='Click "Create Card" to create your first card'
              cta="Create Card"
              ctaURL={`/set/${setId}/card/add`}
            />
          </div>
        )
      )}
    </Main>
  );
};

export default SetPage;
