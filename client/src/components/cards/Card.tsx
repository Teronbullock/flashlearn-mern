
import classNames from "classnames";
// import './scss/card.scss';
import { CardProps } from '../../types/card-types';

const Card = ({ children, className, style }: CardProps) => {
  return (
    <div className={classNames('card rounded-md w-full mx-auto mb-12 p-8 mb-8', className )} style={style}>
      {children}
    </div>
  );
};
export default Card;