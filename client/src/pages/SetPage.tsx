import { useParams } from "react-router-dom";
import CardFeed from "@features/cards/components/CardFeed";
import { useAuthContext } from "@hooks/useAuthContext";
import PageHeader from "@layouts/PageComponents/PageHeader";
import useManageCardData from "@/features/cards/hooks/useManageCardData";
import { Btn } from "@components/Btn/Btn";

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
      <PageHeader currentPage={currentPage}>
        <li>
          <Btn
            el="link"
            variants={{ style: "btn" }}
            className="btn--tertiary btn--page-header mr-4"
            to={`/set/${setId}/card/add`}
          >
            Add Card
          </Btn>
        </li>
        <li>
          <Btn
            el="link"
            variants={{ style: "btn" }}
            className="btn--outline-black btn--page-header mr-4"
            to={`/set/${setId}/cards/?page=1`}
          >
            View Cards
          </Btn>
        </li>
        <li>
          <Btn
            el="link"
            variants={{ style: "btn" }}
            className="btn--outline-black btn--page-header"
            to={`/dashboard/${userSlug}/`}
          >
            Dashboard
          </Btn>
        </li>
      </PageHeader>
      <CardFeed cards={cards} deleteCardHandler={deleteCardHandler} />
    </main>
  );
};

export default SetPage;
