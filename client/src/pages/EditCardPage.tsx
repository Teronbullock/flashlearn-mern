import { useParams } from 'react-router-dom';
import PageHeader from '../layouts/PageComponents/PageHeader';
import PageHero from '../layouts/PageComponents/PageHero';
import Btn from '../components/Btn/Btn';
import useManageCardData from '@/features/cards/hooks/useManageCardData';
import FormAction from '../components/Forms/FormAction';
import FormColorPicker from '../components/Forms/FormColorPicker';
import Form from '../components/Forms/Form';
import FormInput from '../components/Forms/FormInput';

const EditCardPage = () => {
  const { setId, cardId } = useParams();
  const currentPage = 'editCardPage';
  const { state, dispatch, editCardHandler } = useManageCardData({ isEditCard: true, cardId, setId });

  return (
    <main className='main main--edit-card-page'>
      <PageHero currentPage={currentPage} className='hidden md:block' />
      <PageHeader currentPage={currentPage}>
        <Btn className='btn--outline-black btn--large mr-6' to={`/set/${setId}`} isListItem={true}>
          Set Page
        </Btn>
      </PageHeader>
      <section className='container pt-8 pb-4 md:pt-12 lg:max-w-screen-lg'>
        {state ? (
          <Form onSubmit={editCardHandler} className='bg-white'>
            <FormInput
              labelName='Term'
              type='textarea'
              name='term'
              value={state.inputOneValue}
              required={true}
              placeholder='Enter Term'
              onChange={e =>
                dispatch({
                  type: 'SET_INPUT_ONE',
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
                  type: 'SET_INPUT_TWO',
                  payload: { inputTwoValue: e.target.value },
                })
              }
            />
            <FormColorPicker bgColor={state.bgColor} textColor={state.textColor} dispatch={dispatch} />
            <FormAction submitBtnText='Update' cancelBtnTo={`/set/${setId}`} />
          </Form>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </main>
  );
};

export default EditCardPage;
