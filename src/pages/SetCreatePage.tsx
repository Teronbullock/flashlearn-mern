import PageTemplate from "../layouts/PageComponents/PageTemplate";
import FormInput from "../components/Forms/FormInput";
import Form from "../components/Forms/Form";
// import Btn from 



const CreateSet = () => {
  return (
    <PageTemplate 
      currentPage="createSetPage"
    >
      <section className="container py-12">
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
      </section>
    </PageTemplate>
  )
}

export default CreateSet;