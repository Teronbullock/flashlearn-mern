import PageTemplate from "../../components-layouts/PageComponents/PageTemplate";
import Card from "../../components/Cards/Card";
import Form from "../../components/Forms/Form";


const Set = () => {
  return (
    <PageTemplate 
      currentPage="setPage"
    >
      <section className="container py-12">
        <Card>
          <Form
            onSubmit={() => console.log('Form submitted')}
          >
            <>
            </>
          </Form>
        </Card>
      </section>
    </PageTemplate>
  )
}

export default Set;