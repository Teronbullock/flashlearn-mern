import PageTemplate from "../components-layouts/PageComponents/PageTemplate"
import pageContent from "../data/page-content.json"
import DashboardForm from "../components/Forms/DashboardForm"




const Cards = () => {

  return (
    <PageTemplate 
      pageData={pageContent.viewCardsPage}
    >
      <section className="container py-12">
        <DashboardForm />
      </section>
    </PageTemplate>
  )
}

export default Cards;