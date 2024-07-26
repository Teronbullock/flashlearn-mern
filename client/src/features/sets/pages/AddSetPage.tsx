import classNames from 'classnames';
import useAddSetData from '../hooks/useAddSetData';
import { useAuthContext } from '../../../context/hooks/useAuthContext';
import PageHeader from '../../../layouts/PageComponents/PageHeader';
import PageHero from '../../../layouts/PageComponents/PageHero';
import Form from '../../../components/Forms/Form';
import FormInput from '../../../components/Forms/FormInput';
import FormAction from '../../../components/Forms/FormAction';
import Btn from '../../../components/Btn/Btn';

const AddSetPage = () => {
  const { userId } = useAuthContext();
  const { state, submitHandler, dispatch } = useAddSetData();
  const currentPage = 'createSetPage';

  return (
    <main className={classNames('main', `main-${currentPage}`)}>
      <PageHero currentPage={currentPage} className='h-[42vh]' />
      <PageHeader currentPage={currentPage}>
        <Btn
          className='btn--outline-black btn--large'
          to={`/dashboard/${userId}/`}
          isListItem={true}
        >
          Dashboard Page
        </Btn>
      </PageHeader>
      <section className='container py-12 lg:max-w-screen-lg'>
        {!state && <h2 className='text-2xl text-center'>No set found</h2>}
        <Form onSubmit={submitHandler} className='bg-white'>
          <FormInput
            labelName='Title'
            type='textarea'
            name='title'
            value={state.inputOneValue}
            required={true}
            placeholder='Enter Title'
            onChange={e =>
              dispatch({
                type: 'ON_INPUT_ONE_CHANGE',
                payload: { inputOneValue: e.target.value },
              })
            }
            autoFocus={true}
          />
          <FormInput
            labelName='Description'
            type='textarea'
            name='description'
            value={state.inputTwoValue}
            placeholder='Enter Description'
            onChange={e =>
              dispatch({
                type: 'ON_INPUT_TWO_CHANGE',
                payload: { inputTwoValue: e.target.value },
              })
            }
          />
          <FormAction
            submitBtnText='Create'
            cancelBtnTo={`/dashboard/${userId}/`}
          />
        </Form>
      </section>
    </main>
  );
};

export default AddSetPage;
