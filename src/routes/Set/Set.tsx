import PageTemplate from "../../layouts/PageComponents/PageTemplate/PageTemplate";
import pageContent from "../../data/page-content.json";
import Card from "../../components/Cards/Card";
import Form from "../../components/Forms/Form";
import FormInput from "../../components/Forms/FormInput";

const Set = () => {
  return (
    <PageTemplate 
      pageData={pageContent.setPage}
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