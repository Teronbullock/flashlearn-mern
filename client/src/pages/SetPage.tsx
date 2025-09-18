import { useParams } from "react-router-dom";
import CardFeed from "@features/cards/components/CardFeed";
import { useAuthContext } from "@hooks/useAuthContext";
import PageHero from "@layouts/PageComponents/PageHero";
import PageHeader from "@layouts/PageComponents/PageHeader";
import { ListItemLink } from "@components/ListItemLink/ListItemLink";
import useManageCardData from "@/features/cards/hooks/useManageCardData";

const SetPage = () => {
  const { userSlug } = useAuthContext();
  const { setId } = useParams();
  const currentPage = "setPage";
  const { cards, deleteCardHandler } = useManageCardData({
    isGetCards: true,
    setId,
  });

  return (
    <main className="main main-setPage">
      <PageHero currentPage={currentPage} />
      <PageHeader currentPage={currentPage}>
        <ListItemLink
          className="btn--tertiary btn--page-header mr-4"
          to={`/set/${setId}/card/add`}
        >
          Add Card
        </ListItemLink>
        <ListItemLink
          className="btn--outline-black btn--page-header mr-4"
          to={`/set/${setId}/cards/?page=1`}
        >
          View Cards
        </ListItemLink>
        <ListItemLink
          className="btn--outline-black btn--page-header"
          to={`/dashboard/${userSlug}/`}
        >
          Dashboard
        </ListItemLink>
      </PageHeader>
      <CardFeed cards={cards} deleteCardHandler={deleteCardHandler} />
    </main>
  );
};

export default SetPage;
