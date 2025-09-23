import { useParams } from "react-router-dom";
import PageHeader from "@layouts/PageComponents/PageHeader";
import SetFeed from "@features/sets/components/SetFeed";
import { Btn } from "@components/Btn/Btn";

const Dashboard = () => {
  const { userSlug } = useParams();
  const currentPage = "dashboardPage";

  return (
    <main className="main main-dashboard-page">
      <PageHeader currentPage={currentPage}>
        <li>
          <Btn
            el="link"
            variants={{ style: "btn" }}
            className="btn--tertiary btn--large"
            to={`/set/user/${userSlug}/add`}
          >
            Create Set
          </Btn>
        </li>
      </PageHeader>
      <SetFeed />
    </main>
  );
};

export default Dashboard;
