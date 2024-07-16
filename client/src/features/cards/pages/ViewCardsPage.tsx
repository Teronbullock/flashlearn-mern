import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PageHero from "../../../layouts/PageComponents/PageHero";
import PageHeader from "../../../layouts/PageComponents/PageHeader";
import ListItemBtn from "../../../components/Btn/ListItemBtn";
import ViewCardSection from "../components/ViewCardSection";
import useGetCardView from "../hooks/useGetCardView";


const ViewCardsPage = () => {
  // const currentPage = 'viewCardsPage';
  // const { setId } = useParams();
  // const [searchParams] = useSearchParams();
  // const page = searchParams.get('page');
  // const {cards, getCards} = useGetCardView(setId, page);
  // const [cardArray, setCardArray] = useState(cards);


(async ()=>{

  // console.log('viewcard - cards: ',  await getCards());
})();
console.log('viewcard - cards: ');

  return(
    <main className="main main-viewCardsPage" >
      {/* <PageHero currentPage={currentPage} className="page-header--index h-[25vh]" />
      <PageHeader currentPage={currentPage}>
        <ListItemBtn
          className="btn--tertiary btn--large"
          to={`/set/${setId}`}
        >
          Set Page
        </ListItemBtn>
      </PageHeader>
      <ViewCardSection
        page={Number(page)}
        setId={setId}
        // cards={cards}
        // {...state.cards}
      /> */}
    </main>
  );
}

export default ViewCardsPage;