import { useParams } from 'react-router-dom';
import CardFeed from '../components/CardFeed';
import { useAuthContext } from '../../../context/hooks/useAuthContext';
import PageHero from '../../../layouts/PageComponents/PageHero';
import PageHeader from '../../../layouts/PageComponents/PageHeader';
import Btn from '../../../components/Btn/Btn';

const SetPage = () => {
  const { userId } = useAuthContext();
  const { setId } = useParams();
  const currentPage = 'setPage';

  return (
    <main className='main main-setPage'>
      <PageHero currentPage={currentPage} />
      <PageHeader currentPage={currentPage}>
        <Btn
          className='btn--tertiary btn--page-header mr-4'
          to={`/set/${setId}/card/add`}
          isListItem={true}
        >
          Add Card
        </Btn>
        <Btn
          className='btn--outline-black btn--page-header mr-4'
          to={`/set/${setId}/cards/?page=1`}
          isListItem={true}
        >
          View Cards
        </Btn>
        <Btn
          className='btn--outline-black btn--page-header'
          to={`/dashboard/${userId}/`}
          isListItem={true}
        >
          Dashboard
        </Btn>
      </PageHeader>
      <CardFeed />
    </main>
  );
};

export default SetPage;
