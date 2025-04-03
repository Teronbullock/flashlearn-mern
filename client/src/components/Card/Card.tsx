import classNames from 'classnames';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Card = ({ children, className, style, ...props }: CardProps) => {
  return (
    <div className={classNames('card rounded-md w-full mx-auto mb-8 p-4 md:p-8', className)} style={style} {...props}>
      {children}
    </div>
  );
};
export default Card;
