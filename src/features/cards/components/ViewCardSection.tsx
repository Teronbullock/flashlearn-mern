import { useState, memo } from 'react';
import classnames from 'classnames';
import Btn from '../../../components/Btn/Btn';
import './ViewCardSection.scss';
import CardFace from './CardFace';

interface ViewCardSectionProps {
  page: number;
  setId: string;
  card: {
    term: string;
    definition: string;
    bg_color: string;
    text_color: string;
  };
  cardCount: number;
  cardLoadClass?: null;
}

const ViewCardSection = ({
  page,
  setId,
  card,
  cardCount,
}: ViewCardSectionProps) => {
  const [flashcardClass, setFlashcardClass] = useState('');
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

  if (page <= 1) {
    backBtnUrl = `/set/${setId}/cards/?page=${page}`;
    disableBackBtnStyle = 'pointer-events-none';
  } else {
    backBtnUrl = `/set/${setId}/cards/?page=${page - 1}`;
    disableBackBtnStyle = '';
  }

  if (page >= cardCount) {
    nextBtnUrl = `/set/${setId}/cards/?page=${page}`;
    disableNextBtnStyle = 'pointer-events-none';
  } else {
    nextBtnUrl = `/set/${setId}/cards/?page=${page + 1}`;
    disableNextBtnStyle = '';
  }

  const handFlipAction = () => {
    if(flashcardClass) {
      setFlashcardClass('');
    } else {
      setFlashcardClass('flashcard--flipped');
    }
  };

  return (
    <section className='section-flash-card p-8 md:w-1/2 mx-auto'>
      {card ? (
        <div className={classnames('flashcard mx-auto', flashcardClass)}>
          <div className='flashcard__inner'>
            {term && (
              <CardFace
                className='flashcard--front'
                bgColor={bgColor}
                textColor={textColor}
                cardHeaderText='Term'
                cardText={term}
                handFlipAction={handFlipAction}
                BtnText='Definition'
              >
                <div className='flashcard__footer d-flex justify-content-center p-4'>
                  <Btn
                    className={classnames(
                      'btn btn--outline-secondary mr-4',
                      disableBackBtnStyle
                    )}
                    onClick={()=>{setFlashcardClass('')}}
                    to={backBtnUrl}
                  >
                    &lt;
                  </Btn>
                  <Btn
                    className={classnames(
                      'btn btn--black',
                      disableNextBtnStyle
                    )}
                    onClick={()=>{setFlashcardClass('')}}
                    to={nextBtnUrl}
                  >
                    &gt;
                  </Btn>
                </div>
              </CardFace>
            )}
            {definition && (
              <CardFace
                className='flashcard--back'
                bgColor={bgColor}
                textColor={textColor}
                cardHeaderText='Definition'
                cardText={definition}
                handFlipAction={handFlipAction}
                BtnText='Term'
              >
                <div className='flashcard__footer d-flex justify-content-center p-4'>
                  <Btn
                    className={classnames(
                      'btn btn--outline-secondary mr-4',
                      disableBackBtnStyle
                    )}
                    onClick={()=>{setFlashcardClass('')}}
                    to={backBtnUrl}
                  >
                    &lt;
                  </Btn>
                  <Btn
                    className={classnames(
                      'btn btn--black',
                      disableNextBtnStyle
                    )}
                    onClick={()=>{setFlashcardClass('')}}
                    to={nextBtnUrl}
                  >
                    &gt;
                  </Btn>
                </div>
              </CardFace>
            )}
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
