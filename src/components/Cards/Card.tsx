import './Card.scss';

interface CardProps {
  children: React.ReactNode;
}

const Card = ({children}: CardProps) => {

  return (
    <div className={`card bg-white text-black rounded-md w-full mx-auto mb-12 p-8`}>
      {children}
    </div>
  );
}

export default Card;