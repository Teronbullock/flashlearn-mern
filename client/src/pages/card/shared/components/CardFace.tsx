import classnames from 'classnames';

interface CardFaceProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  textColor?: string;
  cardHeaderText: string;
  cardText: string;
  handFlipAction: () => void;
  BtnText: string;
}

const CardFace = ({
  children,
  className,
  bgColor = '#ffffff',
  textColor = '#000000',
  cardHeaderText,
  cardText,
  handFlipAction,
  BtnText,
}: CardFaceProps) => {
  return (
    <div className={classnames('flashcard', className)} style={{ backgroundColor: bgColor }}>
      <div className='flashcard__aside'>
        <h1 className='flashcard__title flashcard__title--front mt-0'>{cardHeaderText}</h1>
      </div>
      <div className='flashcard__body'>
        <div className='flashcard__header p-3' style={{ borderColor: textColor }}>
          <a className='btn btn--secondary btn--large mb-8' onClick={handFlipAction}>
            {BtnText}
          </a>
          <p className='flashcard__text text-[textColor' style={{ color: textColor }}>
            {cardText}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CardFace;
