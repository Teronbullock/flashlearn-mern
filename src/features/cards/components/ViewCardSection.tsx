import { useState, useEffect, memo } from 'react';
import './ViewCardSection.scss';
import Btn from '../../../components/Btn/Btn';

const ViewCardSection = memo(({page, setId, cards, ...props}) => {
  const[backBtnURL, setBackBtnURL] = useState(`/set/${setId}/cards/?page=${page - 1}`);
  const[nextBtnURL, setNextBtnURL] = useState(`/set/${setId}/cards/?page=${page + 1}`);
  const [currentCard, setCurrentCard] = useState(page - 1);

  const { term, definition } = currentCard;
  
  useEffect(() => {
    
    if (page <= 1 ) {
      setBackBtnURL('');
    } else {
      setBackBtnURL(`/set/${setId}/cards/?page=${page - 1}`);
    }
    // console.log('page: ', page, cards);
    // setCurrentCard(cards[2 - 1]);
  }, [page, backBtnURL, nextBtnURL]);

  return (
    <section className='section-flash-card pt-8 w-1/2 mx-auto'>
      <div className='flashcard mx-auto' data-js='flashcard'>
        <div className='flashcard__inner' data-js='flashcardInner'>
          <div
            className='flashcard--front'
            style={{ backgroundColor: '#fff' }}
            data-js='flashcardFront'
          >
            <div className='flashcard__aside'>
              <h1 className='flashcard__title flashcard__title--front mt-0'>
                Term
              </h1>
            </div>
            <div className='flashcard__body'>
              <div
                className='flashcard__header p-3'
                style={{ borderColor: '#000' }}
              >
                <a
                  className='btn btn--secondary btn--large mb-3'
                  data-js='flashcardFrontFlipBtn'
                >
                  Definition
                </a>
                <p className='flashcard__text' style={{ color: '#000' }}>
                  {term}
                </p>
              </div>
              <div className='flashcard__footer d-flex justify-content-center p-4'>
                <Btn 
                  className='btn btn--outline-secondary mr-4' 
                  // to={`/set/${setId}/cards/?page=${page - 1}`}
                  to={backBtnURL}
                >
                  &lt;
                </Btn>
                <Btn 
                  className='btn btn--black'
                  // to={`/set/${setId}/cards/?page=${page + 1}`}
                  to={nextBtnURL}
                >
                  &gt;
                </Btn>
              </div>
            </div>
          </div>
          <div
            className='flashcard--back'
            style={{ backgroundColor: '#fff' }}
            data-js='flashcardBack'
          >
            <div className='flashcard__aside'>
              <h1 className='flashcard__title flashcard__title--back mt-0'>
                Definition
              </h1>
            </div>
            <div className='flashcard__body'>
              <div
                className='flashcard__header p-3'
                style={{ borderColor: '#000' }}
              >
                <a
                  className='btn btn--secondary btn--large my-3'
                  data-js='flashcardBackFlipBtn'
                >
                  Term
                </a>
                <p className='flashcard__text' style={{ color: '#000' }}>
                 {definition}
                </p>
              </div>
              <div className='flashcard__footer d-flex justify-content-center p-4'>
                <Btn className='btn btn--outline-secondary mr-4' tag='button'>
                  &lt;
                </Btn>
                <Btn className='btn btn--black' tag='button'>
                  &gt;
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ViewCardSection;
