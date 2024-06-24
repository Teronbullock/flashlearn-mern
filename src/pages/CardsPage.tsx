import PageTemplate from "../layouts/PageComponents/PageTemplate"
import pageContent from "../data/page-content.json"
import DashboardForm from "../components/Forms/ListCardForm"




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