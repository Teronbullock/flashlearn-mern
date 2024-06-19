import PageTemplate from "../../components-layouts/PageComponents/PageTemplate";
import Card from "../../components/Cards/Card";
import Form from "../../components/Forms/Form";
import FormInput from "../../components/Forms/FormInput";
// import Btn from 



const CreateSet = () => {
  return (
    <PageTemplate 
      currentPage="createSetPage"
    >
      <section className="container py-12">
        <Card    
        >
          <Form
            onSubmit={() => console.log('Form submitted')}
          >
            <FormInput
              labelName="Title"
              inputObj={{
                'type': 'text',
                'name': 'title',
                'placeholder': 'Enter title',
                'required': true,
                
              }}

              onChange={() => console.log('Input changed')}
            />
            <FormInput
              labelName="Description"
              inputObj={{
                'type': 'textarea',
                'name': 'description',
                'placeholder': 'Enter description',

              }}
              onChange={() => console.log('Input changed')}
            />
            <div className="form__action flex md:block">
              {/* <Btn
                elementType='btn'
                className='btn--large btn--tertiary text-white'
                type='submit'
              >
                Create Set
              </Btn>
              <Btn
                elementType='anchor'
                className='btn--large btn--outline-black'
                to='/dashboard'
              >
                Cancel
              </Btn> */}
            </div>
          </Form>
        </Card>
      </section>
    </PageTemplate>
  )
}

export default CreateSet;