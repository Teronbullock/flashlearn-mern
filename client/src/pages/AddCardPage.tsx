import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import PageHeader from '../layouts/PageComponents/PageHeader';
import PageHero from '../layouts/PageComponents/PageHero';
import { ListLinkItem } from '../components/ListLinkItem/ListLinkItem';
import FormAction from '../components/Forms/FormAction';
import Form from '../components/Forms/Form';
import FormInput from '../components/Forms/FormInput';
import useManageCardData from '@/features/cards/hooks/useManageCardData';

const AddCardPage = () => {
  const { setId } = useParams();
  const { state, addCardHandler, dispatch } = useManageCardData({ setId });
  const currentPage = 'addCardPage';

  return (
    <main className={classNames('main', `main-${currentPage}`)}>
      <PageHero currentPage={currentPage} />
      <PageHeader currentPage={currentPage}>
        <ListLinkItem
          className='btn--outline-black btn--large'
          to={`/set/${setId}/`}
        >
          Set page
        </ListLinkItem>
      </PageHeader>
      <section className='container py-12 lg:max-w-screen-lg'>
        {!state && <h2 className='text-2xl text-center'>No set found</h2>}
        <Form onSubmit={addCardHandler} className='bg-white'>
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
          <FormAction submitBtnText='Create' cancelBtnTo={`/set/${setId}/`} />
        </Form>
      </section>
    </main>
  );
};

export default AddCardPage;
