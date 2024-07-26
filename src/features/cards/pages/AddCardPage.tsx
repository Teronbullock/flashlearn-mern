import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import PageHeader from '../../../layouts/PageComponents/PageHeader';
import PageHero from '../../../layouts/PageComponents/PageHero';
import useAddCardData from '../hooks/useAddCardData';
import Btn from '../../../components/Btn/Btn';
import FormAction from '../../../components/Forms/FormAction';
import Form from '../../../components/Forms/Form';
import FormInput from '../../../components/Forms/FormInput';

const AddCardPage = () => {
  const { setId } = useParams();
  const { state, submitHandler, dispatch } = useAddCardData();
  const currentPage = 'addCardPage';

  return (
    <main className={classNames('main', `main-${currentPage}`)}>
      <PageHero currentPage={currentPage} className='h-[42vh]' />
      <PageHeader currentPage={currentPage}>
        <Btn
          className='btn--outline-black btn--large'
          to={`/set/${setId}/`}
          isListItem={true}
        >
          Set page
        </Btn>
      </PageHeader>
      <section className='container py-12 lg:max-w-screen-lg'>
        {!state && <h2 className='text-2xl text-center'>No set found</h2>}
        <Form onSubmit={submitHandler} className='bg-white'>
          <FormInput
            labelName='Term'
            type='textarea'
            name='term'
            value={state.inputOneValue}
            required={true}
            placeholder='Enter Term'
            onChange={e =>
              dispatch({
                type: 'ON_INPUT_ONE_CHANGE',
                payload: { inputOneValue: e.target.value },
              })
            }
            autoFocus={true}
          />
          <FormInput
            labelName='Definition'
            type='textarea'
            name='definition'
            value={state.inputTwoValue}
            placeholder='Enter Definition'
            onChange={e =>
              dispatch({
                type: 'ON_INPUT_TWO_CHANGE',
                payload: { inputTwoValue: e.target.value },
              })
            }
          />
          <FormAction submitBtnText='Create' cancelBtnTo={`/set/${setId}/`} />
        </Form>
      </section>
    </main>
  );
};

export default AddCardPage;
