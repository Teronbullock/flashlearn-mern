import PageTemplate from "../layouts/PageComponents/PageTemplate";
import CardDataFetch from "../features/cards/CardDataFetch";


const CardAddEditPage = () => {
  return (
    <PageTemplate currentPage="editCardPage">
      <CardDataFetch />
    </PageTemplate>
  );
};

export default CardAddEditPage;