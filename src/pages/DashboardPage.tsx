import PageTemplate from "../layouts/PageComponents/PageTemplate";
import ManageSetData from "../features/sets/ManageSetData";


const Dashboard = () => {
  return (
    <PageTemplate currentPage={'dashboardPage'} >
      <ManageSetData />
    </PageTemplate>
  )
}

export default Dashboard;