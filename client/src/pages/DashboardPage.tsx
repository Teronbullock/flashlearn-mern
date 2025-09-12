import { useParams } from 'react-router-dom';
import PageHero from '@layouts/PageComponents/PageHero';
import PageHeader from '@layouts/PageComponents/PageHeader';
import SetFeed from '@features/sets/components/SetFeed';
import { ListLinkItem } from '@components/ListLinkItem/ListLinkItem';

const Dashboard = () => {
  const { userSlug } = useParams();
  const currentPage = 'dashboardPage';

  return (
    <main className='main main-dashboard-page'>
      <PageHero currentPage={currentPage} />
      <PageHeader currentPage={currentPage}>
        <ListLinkItem
          className='btn--tertiary btn--large'
          to={`/set/user/${userSlug}/add`}
        >
          Create Set
        </ListLinkItem>
      </PageHeader>
      <SetFeed />
    </main>
  );
};

export default Dashboard;
