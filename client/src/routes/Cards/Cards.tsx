import PageTemplate from "../../components-layouts/PageComponents/PageTemplate"
import pageContent from "../../data/page-content.json"
import DashForm from "../../components/Forms/DashForm"




const Cards = () => {

  return (
    <PageTemplate 
      pageData={pageContent.viewCardsPage}
    >
      <section className="container py-12">
        <DashForm />
      </section>
    </PageTemplate>
  )
}

export default Cards;