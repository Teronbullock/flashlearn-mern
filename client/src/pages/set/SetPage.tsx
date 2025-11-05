import { EmptyFeedSection } from "@components/ui/EmptyFeedSection";
import { useParams } from "react-router-dom";
import { PageHeader } from "@components/layout/PageHeader";
import { FormLayout, FormGroup, FormInput } from "@components/forms";
import { CardFeed } from "./components";
import { useAuthContext } from "@/hooks/index";
import { Main } from "@layouts/Main";

import { useSetData } from "./hooks";
import { BtnLink } from "@components/btn";
import { InfoSection } from "@components/layout/sections/InfoSection";
import data from "@content/addSetPage.json";

export const SetPage = () => {
  const { userSlug } = useAuthContext();
  const { setId } = useParams();
  setId?.toString();

  const { cards, deleteCardHandler } = useSetData({
    isGetCards: true,
    setId,
  });

  const { emptyPage, InfoData } = data;

  const pageInfoData = InfoData;
  pageInfoData[0]["number"] = cards.length.toString();

  return (
    <Main>
      {userSlug && cards && cards.length > 0 ? (
        <>
          <PageHeader data={{ title: "Set Page" }}>
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
                  placeholder="Search for card"
                />
              </FormGroup>
            </FormLayout>
          </PageHeader>
          <div>
            <p>{}</p>
          </div>
          <InfoSection data={pageInfoData} />

          <section className="mb-8 flex flex-wrap justify-between">
            <h2 className="mb-3 md:mb-0">Study Cards</h2>
            <div>
              <BtnLink
                className="md:mr-4"
                to={`/${userSlug}/set/${setId}/card/add`}
                variants={{ style: "btn", color: "primary", size: "lg" }}
              >
                Create New Card
              </BtnLink>
              {cards && (
                <BtnLink
                  variants={{
                    style: "btn",
                    color: "outline-primary",
                    size: "lg",
                  }}
                  to={`/${userSlug}/set/${setId}/cards/?page=1`}
                >
                  View Cards
                </BtnLink>
              )}
            </div>
          </section>
          <CardFeed cards={cards} deleteCardHandler={deleteCardHandler} />
        </>
      ) : userSlug && setId ? (
        <EmptyFeedSection userSlug={userSlug} setId={setId} {...emptyPage} />
      ) : null}
    </Main>
  );
};
