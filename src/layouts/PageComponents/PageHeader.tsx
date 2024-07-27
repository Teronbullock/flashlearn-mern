import {
  PageHeaderProps,
  HeaderInterface,
} from './types/page-types';
import PageContentFile from '../../data/page-content.json';


const PageHeader = ({ currentPage, children }: PageHeaderProps ) => {
const pageContent = PageContentFile[currentPage];
const { title, copy } = pageContent.header as HeaderInterface;

  return (
    <header className='page-header bg-white py-2 md:py-4'>
      {currentPage !== 'indexPage' && (
        <div className='container flex flex-col md:flex-row justify-between'>
          <div className='page-header__content w-full md:w-1/2 mb-2 md:mb-0'>
            <h1 className='mb-2 text-2xl md:text-4xl'>{title}</h1>
            <h3 className='md:text-xl'>{copy}</h3>
          </div>
          {children && (
            <>
              <span className='hidden md:inline divider-v '></span>
              <div className='page-header__nav sm:w-[50%] md:w-[45%] pt-2'>
                <ul className='page-header__nav-list flex justify-between md:justify-start'>
                  {children}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default PageHeader;
