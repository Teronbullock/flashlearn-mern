import { useContext } from 'react';
import { PageTemplateProps } from './PageTemplateTypes';
import PageHero from './PageHero';
import PageHeader from './PageHeader';
import { PageTempProvider, PageTempContext } from '../../context/PageTempContext';
import classNames from 'classnames';


const PageTemplate = ({currentPage, children }: PageTemplateProps) => {
  return (
    <PageTempProvider>
      <PageMain currentPage={currentPage}>
        {children}
      </PageMain>
    </PageTempProvider>
  );
}


const PageMain = ({currentPage, children}: PageTemplateProps) => {
  const { pageContent } = useContext(PageTempContext);
  const currentPageContent = pageContent[currentPage];

  const { mainClass, hero, header, } = currentPageContent;
  let heroData;

  if (currentPage === 'indexPage') {
    heroData = {
      ...hero,
      ...header,
      currentPage
    }
  } else {
    heroData = {
      ...hero,
    }
  }

  return (
    <main className={classNames('main', mainClass)}>
      <PageHero heroData={heroData} />
        {currentPage === 'indexPage' ? null : (
          <PageHeader headerData={header} />
        )}
        {children}
    </main>
  );
}

export default PageTemplate;