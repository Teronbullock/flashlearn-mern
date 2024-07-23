import { useParams } from "react-router-dom";
import CardFeed from '../components/CardFeed';
import { useAuthContext } from '../../../context/hooks/useAuthContext';
import PageHero from "../../../layouts/PageComponents/PageHero";
import PageHeader from "../../../layouts/PageComponents/PageHeader";
import ListItemBtn from '../../../components/Btn/ListItemBtn';


const SetPage = () => {
  const { userId } = useAuthContext();
  const { setId } = useParams();
  const currentPage = 'setPage';

  return (
    <main className="main main-setPage">
      <PageHero currentPage={currentPage} className="h-[42vh]"/>
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