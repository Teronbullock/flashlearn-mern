import PageTemplate from "../layouts/PageComponents/PageTemplate/PageTemplate"
import pageContent from "../data/page-content.json"
import DashForm from "../components/Forms/DashForm"




const Dashboard = () => {

  return (
    <PageTemplate 
      pageData={pageContent.dashboardPage}
    >
      <section className="container py-12">
        <DashForm />
      </section>
    </PageTemplate>
  )
}

export default Dashboard;