import { useContext } from "react";
import { useParams } from "react-router-dom";
import CardFeed from '../components/CardFeed';
import { AuthContext } from "../../../context/AuthContext";
import PageHero from "../../../layouts/PageComponents/PageHero";
import PageHeader from "../../../layouts/PageComponents/PageHeader";

import pageContent from "../../../data/page-content.json";
import ListItemBtn from '../../../components/Btn/ListItemBtn';


const SetPage = () => {
  const { userId } = useContext(AuthContext);
  const { setId } = useParams();
  const currentPage = 'setPage';

  
  return (
    <main className="main main-setPage">
      <PageHero currentPage={currentPage} />
      <PageHeader currentPage={currentPage}>
        <ListItemBtn
          className="btn--tertiary btn--large mr-6"
          to={`/set/${setId}/card/add`}
        >
          Add Card
        </ListItemBtn>
        <ListItemBtn
          className="btn--outline-black btn--large mr-6"
          to={`/set/${setId}/cards/?page=1`}
        >
          View Cards
        </ListItemBtn>
        <ListItemBtn
          className="btn--outline-black btn--large"
          to={`/dashboard/${userId}/`}
        >
          Dashboard
        </ListItemBtn>
      </PageHeader>
      <CardFeed />
    </main>
  )
}

export default SetPage;