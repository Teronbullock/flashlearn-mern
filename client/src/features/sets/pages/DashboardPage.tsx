import { useParams } from "react-router-dom";
import PageHero from "../../../layouts/PageComponents/PageHero";
import PageHeader from "../../../layouts/PageComponents/PageHeader";
import SetFeed from "../components/SetFeed";
import ListItemBtn from "../../../components/Btn/ListItemBtn";


const Dashboard = () => {
  const { userId } = useParams();
  const currentPage = 'dashboardPage';
  

  return (
    <main className="main main-dashboardPage" >
      <PageHero currentPage={currentPage} className="h-[42vh]"/>
      <PageHeader currentPage={currentPage}> 
        <ListItemBtn
          tag="Link" 
          className="btn--tertiary btn--large"
          to={`/set/user/${userId}/add`}
        >
          Create Set
        </ListItemBtn>
      </PageHeader>
      <SetFeed />
    </main>
  );
};

export default Dashboard;