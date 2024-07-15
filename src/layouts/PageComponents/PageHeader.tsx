import {
  PageHeaderProps,
  HeaderInterface,
} from '../../types/page-template-types';
import PageContentFile from '../../data/page-content.json';


const PageHeader = ({ currentPage, children }: PageHeaderProps ) => {
const pageContent = PageContentFile[currentPage];
const { title, copy } = pageContent.header as HeaderInterface;

  return (
    <header className='page-header bg-white py-4'>
      {currentPage !== 'indexPage' && (
        <div className='container flex justify-between'>
          <div className='page-header__content w-1/2'>
            <h1 className='mb-2 text-4xl'>{title}</h1>
            <h3 className='text-2xl'>{copy}</h3>
          </div>
          <span className='hidden md:inline divider-v '></span>
          {children && (
            <div className='page-header__nav w-2/5 pt-2'>
              <ul className='page-header__nav-list flex'>
                {children}
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default PageHeader;
