import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useAuthContext } from '../context/hooks/useAuthContext';
import PageHeader from '../layouts/PageComponents/PageHeader';
import { ListLinkItem } from '@components/ListLinkItem/ListLinkItem';
import PageHero from '../layouts/PageComponents/PageHero';
import useManageSetData from '../features/sets/hooks/useManageSetData';
import Form from '@components/Forms/Form';
import FormInput from '@components/Forms/FormInput';
import FormAction from '@components/Forms/FormAction';

const EditSetPage = () => {
  const { userSlug } = useAuthContext();
  const { setId } = useParams();
  const { state, editSetHandler, dispatch } = useManageSetData({
    isEditSet: true,
    setId,
  });
  const currentPage = 'editSetPage';

  return (
    <main className={classNames('main', `main-${currentPage}`)}>
      <PageHero currentPage={currentPage} className='hidden md:block' />
      <PageHeader currentPage={currentPage}>
        <ListLinkItem
          className='btn--large btn--outline-black mr-6'
          to={`/set/${setId}/`}
        >
          View Set
        </ListLinkItem>
        <ListLinkItem
          className='btn--large btn--outline-black'
          to={`/dashboard/${userSlug}/`}
        >
          Dashboard Page
        </ListLinkItem>
      </PageHeader>
      <section className='container py-12 lg:max-w-screen-lg'>
        {!state && <h2 className='text-2xl text-center'>No set found</h2>}
        <Form onSubmit={editSetHandler} className='bg-white'>
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
            submitBtnText='Update'
            cancelBtnTo={`/dashboard/${userSlug}/`}
          />
        </Form>
      </section>
    </main>
  );
};

export default EditSetPage;
