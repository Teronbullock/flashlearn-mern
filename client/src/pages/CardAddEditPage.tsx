import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageTemplate from '../layouts/PageComponents/PageTemplate';
import useCardDataFetch from '../hooks/useCardDataFetch';
import { PageTempContext } from '../context/PageTempContext';
import ManageCardForm from '../components/Forms/ManageCardForm';

const CardAddEditPage = () => {
  const { setHeaderNav } = useContext(PageTempContext);
  const { action, setId } = useParams();
  const { state, dispatch, onSubmit, setPageType } = useCardDataFetch();
  let currentPage = '';
  let submitBtnText = '';

  const headerNavArr = [
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
    setHeaderNav(headerNavArr);
    setPageType(action);

  }, []);

  /*
    <ManageCardForm

              
    />
    
    )}
    */
   
   return (
     <PageTemplate currentPage={currentPage}>
      <section className='container py-12 lg:max-w-screen-lg'>
        {!state && <h2 className="text-2xl text-center">No card found</h2>}
        <ManageCardForm
          inputOneLabel='Term'
          inputTwoLabel='Definition'
          submitBtnText={submitBtnText}
          inputOneValue={state.inputOneValue}
          inputTwoValue={state.inputTwoValue}
          onSubmit={onSubmit}
          dispatch={dispatch}
          {...(action === 'edit' && { 
            bgColor: state.card_color,
            textColor: state.card_text_color,
          })}
          to={`/set/${setId}`}
        />
      </section>
    </PageTemplate>
  );
};

export default CardAddEditPage;
