import { useContext } from 'react';
import {
  CurrentPage,
  PageHeaderNavItem,
  HeaderInterface,
} from '../../types/page-template-types';
import Btn from '../../components/Btn/Btn';
import { PageTempContext } from '../../context/PageTempContext';

const PageHeader = ({ currentPage }: CurrentPage) => {
  const { pageContent, headerNav } = useContext(PageTempContext);
  const currentPageContent = pageContent[currentPage];
  const { header } = currentPageContent;
  console.log('headerNav: ', headerNav);
  const { title, copy } = header as HeaderInterface;

  return (
    <header className='page-header bg-white py-4'>
      <div className='container flex justify-between'>
        <div className='page-header__content w-1/2'>
          <h1 className='mb-4'>{title}</h1>
          <h3>{copy}</h3>
        </div>
        <span className='hidden md:inline divider-v '></span>
        <nav className='page-header__nav w-2/5 pt-2'>
          <ul className='page-header__nav-list flex justify-between'>
            {headerNav
              ? headerNav.map((navItem: PageHeaderNavItem, index: number) => {
                  const {
                    className,
                    btnText,
                    to,
                    ariaLabel,
                    dataType,
                    elementType,
                  } = navItem;

                  return (
                    <li className='page-header__nav-item' key={index}>
                      <Btn
                        className={`btn--large ${className}`}
                        to={to}
                        elementType={elementType}
                        ariaLabel={ariaLabel}
                        dataType={dataType ? dataType : ''}
                      >
                        {btnText}
                      </Btn>
                    </li>
                  );
                })
              : null}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default PageHeader;
