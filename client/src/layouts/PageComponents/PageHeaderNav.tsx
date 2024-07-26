import { PropsWithChildren } from "react";


const PageHeaderNav = ({ children }: PropsWithChildren) => {

  return (
    <nav className='page-header__nav w-2/5 pt-2'>
      <ul className='page-header__nav-list flex'>
        {children}
      </ul>
    </nav>
  );
};

export default PageHeaderNav;
