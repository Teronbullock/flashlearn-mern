import { useState, useEffect, memo } from 'react';
import classnames from 'classnames';
import Btn from '../../../components/Btn/Btn';
import './ViewCardSection.scss';
import '../../../lib/card-script';

const ViewCardSection = ({page, setId, card, cardCount, ...props}) => {
  let backBtnUrl = `/set/${setId}/cards/?page=${page - 1}`;
  let nextBtnUrl = `/set/${setId}/cards/?page=${page + 1}`;
  let term, definition, bgColor, textColor;
  let disableBackBtnStyle;
  let disableNextBtnStyle;

  if (card) {
    term = card.term;
    definition = card.definition;
    bgColor = card.bg_color;
    textColor = card.text_color;
  }

  if (page <= 1 ) {
    backBtnUrl=`/set/${setId}/cards/?page=${page}`;
    disableBackBtnStyle = 'pointer-events-none';
  } else {
    backBtnUrl=`/set/${setId}/cards/?page=${page - 1}`;
    disableBackBtnStyle = '';
  }

  if (page >= cardCount) {
    nextBtnUrl=`/set/${setId}/cards/?page=${page}`;
    disableNextBtnStyle = 'pointer-events-none';
  } else {
    nextBtnUrl=`/set/${setId}/cards/?page=${page + 1}`;
    disableNextBtnStyle = '';
  }
  
  console.log('btn', page);

  return (
    <section className='section-flash-card pt-8 w-1/2 mx-auto'>
    { card ? (
      <div className='flashcard mx-auto' data-js='flashcard'>
        <div className='flashcard__inner' data-js='flashcardInner'>
          <div
            className='flashcard--front'
            style={{ backgroundColor: bgColor }}
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
                style={{ borderColor: textColor }}
              >
                <a
                  className='btn btn--secondary btn--large mb-8'
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
                  className={classnames('btn btn--outline-secondary mr-4', disableBackBtnStyle)}
                  // tag='button' 
                  // onClick={}
                  to={backBtnUrl}
                >
                  &lt;
                </Btn>
                <Btn 
                  className={classnames('btn btn--black', disableNextBtnStyle)}
                  // tag='button'
                  // onClick={}
                  to={nextBtnUrl}
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
                  className='btn btn--secondary btn--large mb-8'
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
    ) : (
      <div className='flashcard__body'>
        <h1 className='flashcard__title'>No Cards Found</h1>
      </div>
    )}
    </section>
  );
};

export default memo(ViewCardSection);
