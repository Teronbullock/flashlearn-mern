import { useParams } from "react-router-dom";
import { InnerPageHeader } from "@pages/shared/InnerPageHeader";
import { FormLayout, FormGroup, FormInput } from "@components/forms";
import { CardFeed } from "@pages/card/shared/components/CardFeed";
import { useAuthContext } from "@hooks/useAuthContext";
import { Main } from "@layouts/Main";

import useManageCardData from "./shared/hooks/useManageCardData";
import { DashboardInfo } from "@pages/dashboard/components";
import { BtnLink } from "@components/btn";

const SetPage = () => {
  const { userSlug } = useAuthContext();
  const { setId } = useParams();

  const { cards, deleteCardHandler } = useManageCardData({
    isGetCards: true,
    setId,
  });

  const dashInfoData = [
    {
      number: cards.length.toString(),
      copy: "Total Cards",
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
      <InnerPageHeader data={{ title: "Set Page" }}>
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
        <h2 className="mb-3 md:mb-0">Study Cards</h2>
        <BtnLink
          to={`/set/:${setId}/card/add`}
          variants={{ style: "btn", color: "primary", size: "lg" }}
        >
          Create New Card
        </BtnLink>
      </section>
      <CardFeed cards={cards} deleteCardHandler={deleteCardHandler} />
    </Main>
  );
};

export default SetPage;
