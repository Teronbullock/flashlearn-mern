import { useParams } from "react-router-dom";
import PageHero from "../../../layouts/PageComponents/PageHero";
import PageHeader from "../../../layouts/PageComponents/PageHeader";
import SetFeed from "../components/SetFeed";
import Btn from "../../../components/Btn/Btn";


const Dashboard = () => {
  const { userId } = useParams();
  const currentPage = 'dashboardPage';
  

  return (
    <main className="main main-dashboard-page" >
      <PageHero currentPage={currentPage} className="h-[42vh]"/>
      <PageHeader currentPage={currentPage}> 
        <Btn
          className="btn--tertiary btn--large"
          to={`/set/user/${userId}/add`}
          isListItem={true}
        >
          Create Set
        </Btn>
      </PageHeader>
      <SetFeed />
    </main>
  );
};

export default Dashboard;