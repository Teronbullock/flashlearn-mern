import PageTemplate from "../layouts/PageComponents/PageTemplate";
import DashboardDataFetch from "../features/user/DashboardDataFetch";


const Dashboard = () => {
  return (
    <PageTemplate currentPage={'dashboardPage'} >
      <DashboardDataFetch />
    </PageTemplate>
  )
}

export default Dashboard;