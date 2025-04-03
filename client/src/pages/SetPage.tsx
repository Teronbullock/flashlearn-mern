import { useParams } from 'react-router-dom';
import CardFeed from '@features/cards/components/CardFeed';
import { useAuthContext } from '../context/hooks/useAuthContext';
import PageHero from '@layouts/PageComponents/PageHero';
import PageHeader from '@layouts/PageComponents/PageHeader';
import Btn from '@components/Btn/Btn';
import useManageCardData from '@/features/cards/hooks/useManageCardData';

const SetPage = () => {
  const { userSlug } = useAuthContext();
  const { setId } = useParams();
  const currentPage = 'setPage';
  const { cards, deleteCardHandler } = useManageCardData({ isGetCards: true, setId });

  return (
    <main className='main main-setPage'>
      <PageHero currentPage={currentPage} />
      <PageHeader currentPage={currentPage}>
        <Btn className='btn--tertiary btn--page-header mr-4' to={`/set/${setId}/card/add`} isListItem={true}>
          Add Card
        </Btn>
        <Btn className='btn--outline-black btn--page-header mr-4' to={`/set/${setId}/cards/?page=1`} isListItem={true}>
          View Cards
        </Btn>
        <Btn className='btn--outline-black btn--page-header' to={`/dashboard/${userSlug}/`} isListItem={true}>
          Dashboard
        </Btn>
      </PageHeader>
      <CardFeed cards={cards} deleteCardHandler={deleteCardHandler} />
    </main>
  );
};

export default SetPage;
