import Btn from './Btn';

const ListItemBtn = ({ children, className, ...props }) => {
  return (
    <li>
      <Btn
        className={className}
        {...props}
      >
        {children}
      </Btn>
    </li>
  );
};

export default ListItemBtn;
