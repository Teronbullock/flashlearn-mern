import Card from '../../../components/cards/Card';

const ViewCardSection = () => {
  return (
    <section className='section-flash-card py-3 w-1/2 mx-auto'>
      <Card className='bg-white'>
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
                  The is a term for a card
                </p>
              </div>
              <div className='flashcard__footer d-flex justify-content-center p-4'>
                <a className='btn btn--outline-secondary mr-4' disabled=''>
                  &lt;
                </a>
                <a className='btn btn--black' href='/set/5/cards/?page=2'>
                  &gt;
                </a>
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
                  No definition provided
                </p>
              </div>
              <div className='flashcard__footer d-flex justify-content-center p-4'>
                <a className='btn btn--outline-secondary mr-4' disabled=''>
                  &lt;
                </a>
                <a className='btn btn--black' href='/set/5/cards/?page=2'>
                  &gt;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Card>
    </section>
  );
};

export default ViewCardSection;
