
import pageContent from "../data/page-content.json"
import DashboardForm from "../components/Forms/ListCardForm"




const Cards = () => {

  return (
    <main currentPage="main main-CardsPage"
      pageData={pageContent.viewCardsPage}
    >
      <section className="container py-12">
        <DashboardForm />
      </section>
    </main>
  )
}

export default Cards;