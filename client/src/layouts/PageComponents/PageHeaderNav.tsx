import pageContent from '../../data/page-content.json';
import { CurrentPageInterface } from './types/page-types';


const PageHeaderNav = ({children, currentPage }: CurrentPageInterface) => {
  const navItems = pageContent[currentPage].headerNavItems;

  return (
    <nav className='page-header__nav w-2/5 pt-2'>
      <ul className='page-header__nav-list flex'>
        {children}
 
      </ul>
    </nav>
  );
};

export default PageHeaderNav;
