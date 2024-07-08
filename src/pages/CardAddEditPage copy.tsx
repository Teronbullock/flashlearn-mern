import { useContext, useEffect } from 'react';
import { Form, useParams } from 'react-router-dom';
import classNames from 'classnames';
import useCardDataFetch from '../hooks/useCardDataFetch';
import ManageCardForm from '../components/Forms/ManageCardForm';
import PageHero from '../layouts/PageComponents/PageHero';
import PageHeader from '../layouts/PageComponents/PageHeader';
import FormAction from '../components/Forms/FormAction';
import FormColorPicker from '../components/Forms/FormColorPicker';

const CardAddEditPage = () => {
  const { action, setId } = useParams();
  const { state, dispatch, submitHandler, setActionType } = useCardDataFetch();
  let currentPage = '';
  let submitBtnText = '';

  const headerNav = [
    {
      className: 'btn--outline-black',
      btnText: 'View Set',
      to: `/set/${setId}/`,
      ariaLabel: 'View Set Button. Click to return to the dashboard where you can view all of your sets.',
    },
  ];

  if (action === 'add') {
    currentPage = 'addCardPage';
    submitBtnText = 'Add';
  } else if (action === 'edit') {
    currentPage = 'editCardPage';
    submitBtnText = 'Update';
  }

  useEffect(() => {
    setActionType(action);

  }, []);

  console.log('CardAddEditPage:', state,);

   return (
     <main className={classNames('main', `main-${currentPage}`)}>
      <PageHero currentPage={currentPage} />
      <PageHeader currentPage={currentPage} headerNav={headerNav} />
      <section className='container py-12 lg:max-w-screen-lg'>
        {!state && <h2 className="text-2xl text-center">No card found</h2>}
        <ManageCardForm
          formType='card'
          inputValues={[state.inputOneValue, state.inputTwoValue]}
          onSubmit={submitHandler}
          dispatch={dispatch}
          >
          { action === 'edit' && (
            <FormColorPicker 
              bgColor={state.card_color}
              textColor={state.card_text_color}
              dispatch={dispatch}
            />
          )} 
          <FormAction 
            submitBtnText={submitBtnText}
            cancelBtnTo={`/set/${setId}`}
          />
        </ManageCardForm>
      </section>
    </main>
  );
};

export default CardAddEditPage;
