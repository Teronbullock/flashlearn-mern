import { PageTemplateProps } from './PageTemplateTypes';
import PageHero from './PageHero';
import PageHeader from './PageHeader';
import { Link } from 'react-router-dom';
import Btn from '../../components/Btn/Btn';


/**
 *  -- PageTemplate Component --
 * @param {object} pageData - The data object for the page
 * @param {string} pageData.pageType - The type of page
 * @param {string} pageData.mainClass - The main class for the page
 * @param {object} pageData.hero - The hero data object
 * @param {object} pageData.header - The header data object
 * 
 * @param {ReactNode} children - The children components to render
 * @returns 
 */
const PageTemplate = ({ pageData, children }: PageTemplateProps) => {
  const { pageType, mainClass, hero, header } = pageData;
  let heroData;

  if (pageType === 'index') {
    heroData = {
      ...hero,
      ...header,
      pageType
    }
  } else {
    heroData = {
      ...hero,
    }
  }

  return (
    <main className={`main ${mainClass}`}>
      <PageHero heroData={heroData} />
      {pageType === 'index' ? null : (
        <PageHeader headerData={header}>
          {pageType === 'set' ? (
            <>
              <li className="page-header__nav-item">
                <Btn
                  elementType="anchor"
                  className="btn btn--outline-black btn--large"
                  // to=`/set/${setNumber}/edit`  
                >
                  Edit Set
                </Btn>
              </li>
              <li className="page-header__nav-item">
                <Btn
                  elementType="anchor"
                  className="btn btn--outline-black btn--large"
                  // to=`/set/${setNumber}/add`
                >
                  Add Card
                </Btn>
              </li>
              <li className="page-header__nav-item">
                <Btn
                  elementType="anchor"
                  className="btn btn--outline-black btn--large"
                  // to=`/set/${setNumber}/cards/?page=1`  
                >
                  View Cards
                </Btn>
              </li>
            </>
          ) : pageType === 'set' ? (
            <>
            
            </>
          ) : pageType === 'set' ? (
            <>
            
            </>
          ) : null}
        </PageHeader>
      )}
      {children}
    </main>
  );
}

export default PageTemplate;