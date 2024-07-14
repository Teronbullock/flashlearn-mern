import pageContent from '../../data/page-content.json';
import { PageHeaderNavItem, CurrentPage } from '../../types/page-template-types';


const PageHeaderNav = ({children, currentPage }: CurrentPage) => {
  // const navItems = pageContent[currentPage].headerNavItems;

  return (
    <nav className='page-header__nav w-2/5 pt-2'>
      <ul className='page-header__nav-list flex'>
        {children}
 
      </ul>
    </nav>
  );
};

export default PageHeaderNav;
