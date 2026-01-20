import { useParams } from "react-router-dom";
import { Main } from "@layouts/Main";
import { CardFeed } from "@feats/sets/components";
import { useSetManager } from "@feats/sets/hooks";
import { EmptyPageState } from "@components/ui/EmptyPageState";
import { PageHeader } from "@components/layout/PageHeader";
import { ListCardForm } from "@components/forms";
import { BtnLink, Btn } from "@components/btn";
import { InfoSection } from "@components/layout/sections/InfoSection";
import { useFetchSetCards } from "@feats/sets/hooks/useFetchSetCards";
import data from "@content/setContent.json";
import { CardData } from "@app-types/cardType";
import { Spinner } from "@components/ui/Spinner";

// import { FormLayout, FormGroup, FormInput } from "@components/forms";

const SetPage = () => {
  const { setId } = useParams();
  setId?.toString();

  const { setCards, getAllSetCards, loading } = useFetchSetCards({ setId });
  const { deleteSetCardHandler } = useSetManager({ getAllSetCards });

  const { setPage } = data;
  setPage.infoData[0]["number"] = setCards ? setCards.length.toString() : "0";

  if (loading) {
    return <Spinner />;
  }

  return (
    <Main>
      {setCards && setCards.length > 0 ? (
        <>
          <PageHeader data={{ title: "Set Page" }}>
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
                  placeholder="Search for card"
                />
              </FormGroup>
            </FormLayout> */}
          </PageHeader>
          <div>
            <p>{}</p>
          </div>
          <InfoSection data={setPage.infoData} />

          <section className="mb-8 flex flex-wrap justify-between">
            <h2 className="mb-3 md:mb-0">Study Cards</h2>
            <div>
              <BtnLink
                className="md:mr-4"
                to={`/set/${setId}/card/add`}
                variants={{ style: "btn", color: "primary", size: "lg" }}
              >
                Create New Card
              </BtnLink>
              {setCards && (
                <BtnLink
                  variants={{
                    style: "btn",
                    color: "outline-primary",
                    size: "lg",
                  }}
                  to={`/set/${setId}/cards/?page=1`}
                >
                  View Cards
                </BtnLink>
              )}
            </div>
          </section>
          <CardFeed cards={setCards}>
            {(card: CardData) => (
              <ListCardForm
                key={card.id}
                title={card.term}
                description={card.definition}
                hasDescription={true}
                onSubmit={() =>
                  deleteSetCardHandler({
                    cardId: card.id,
                    setId: card.set_id,
                  })
                }
              >
                <div className="flex flex-wrap justify-between">
                  <div className="mb-2 flex">
                    <BtnLink
                      variants={{
                        style: "btn",
                        color: "outline-primary",
                        size: "sm",
                      }}
                      className="p-0 md:mr-6 md:p-2"
                      to={`/set/${card.set_id}/card/${card.id}/edit`}
                    >
                      Edit Card
                    </BtnLink>
                  </div>

                  <Btn type="submit" className="min-w-9.75! justify-end! p-0!">
                    <img
                      src="/assets/img/Vector.png"
                      alt="icon of trash can"
                      className="mx-auto"
                    />
                  </Btn>
                </div>
              </ListCardForm>
            )}
          </CardFeed>
        </>
      ) : (
        setId && (
          <EmptyPageState
            img={{
              src: "/assets/img/book-glasses.png",
              alt: "cartoon of glasses with a book",
            }}
            title="Looks a little empty here"
            subTitle="Let’s fix that! Create your first flashcard Card."
            cta="Create Card"
            ctaURL={`/set/${setId}/card/add`}
          />
        )
      )}
    </Main>
  );
};

export default SetPage;
