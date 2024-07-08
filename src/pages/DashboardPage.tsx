import { useParams } from "react-router-dom";
import PageHero from "../layouts/PageComponents/PageHero";
import PageHeader from "../layouts/PageComponents/PageHeader";
import SetFeed from "../features/sets/SetFeed";


const Dashboard = () => {
  const { userId } = useParams();
  const headerNav = [
    {
      "className": "btn--tertiary",
      "btnText": "Create Set",
      "to": `/set/user/${userId}/add`,
      "ariaLabel": "Create Set Button. Click to create a new set of flashcards."
    }
  ];


  return (
    <main className="main main-dashboardPage" >
      <PageHero currentPage={'dashboardPage'} />
      <PageHeader currentPage={'dashboardPage'} headerNav={headerNav} />
      <SetFeed />
    </main>
  );
};

export default Dashboard;