
import classNames from "classnames";
// import './scss/card.scss';
import { CardProps } from '../../types/card-types';

const Card = ({ children, className, style, ...props }: CardProps) => {
  return (
    <div 
      className={classNames('card rounded-md w-full mx-auto mb-12 p-8', className )}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};
export default Card;