import { PageTemplateProps } from '../PageTemplateTypes';
import PageHero from '../PageHero/PageHero';
import PageHeader from '../PageHeader/PageHeader';
import { Link } from 'react-router-dom';
import Btn from '../../../components/Btn/Btn';


const PageTemplate = ({ pageData, children }: PageTemplateProps) => {
  const { 
    type,
    mainClass,
    hero,
    header,
  } = pageData;

  let heroData;

  if (type === 'index') {
    heroData = {
      ...hero,
      ...header,
      type
    }
  } else {
    heroData = {
      ...hero,
    }
  }
console.log(pageData)
  return (
    <main className={`main ${mainClass}`}>
      <PageHero heroData={heroData} />
      {type === 'index' ? null : (
        <PageHeader headerData={header}>
          {type === 'dashboard' ? (
            <>
              <li className="page-header__nav-item">
                <Btn
                  elementType="anchor"
                  className="btn btn--tertiary btn--large"
                  to="/create-set"  
                >
                  Create Set
                </Btn>
              </li>
            </>
          ) : type === 'set' ? (
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
          ) : type === 'set' ? (
            <>
            
            </>
          ) : type === 'set' ? (
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