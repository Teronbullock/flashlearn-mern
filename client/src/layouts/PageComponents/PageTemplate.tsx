import { useContext } from 'react';
import { PageTemplateProps } from '../../types/page-template-types';
import PageHero from './PageHero';
import PageHeader from './PageHeader';
import {
  // PageTempProvider,
  PageTempContext,
} from '../../context/PageTempContext';
import classNames from 'classnames';

const PageTemplate = ({ currentPage, children }: PageTemplateProps) => {
  const { pageContent } = useContext(PageTempContext);
  const currentPageContent = pageContent[currentPage];
  const { mainClass } = currentPageContent;

  return (
    <main className={classNames('main', mainClass)}>
      <PageHero currentPage={currentPage} />
      {currentPage === 'indexPage' ? null : (
        <PageHeader currentPage={currentPage} />
      )}
      {children}
    </main>
  );

  // return (
  //   <PageTempProvider>
  //     <PageMain currentPage={currentPage}>{children}</PageMain>
  //   </PageTempProvider>
  // );
};

const PageMain = ({ currentPage, children }: PageTemplateProps) => {
  const { pageContent } = useContext(PageTempContext);
  const currentPageContent = pageContent[currentPage];
  const { mainClass } = currentPageContent;

  return (
    <main className={classNames('main', mainClass)}>
      <PageHero currentPage={currentPage} />
      {currentPage === 'indexPage' ? null : (
        <PageHeader currentPage={currentPage} />
      )}
      {children}
    </main>
  );
};

export default PageTemplate;