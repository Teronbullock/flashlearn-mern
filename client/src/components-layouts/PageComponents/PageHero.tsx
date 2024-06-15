import { PageHeroProps } from './PageTemplateTypes';
import './PageComponents.scss';
import Btn from '../../components/Btn/Btn';
import classNames from 'classnames';


const PageHero = ({ heroData }: PageHeroProps) => {
console.log('heroData:', heroData);
  const { 
    ariaLabel,
    img,
    title,
    copy,
    currentPage,
  } = heroData;

  let {
    heroClass,
  } = heroData;
  
  if (currentPage === 'indexPage') {
    heroClass += ' page-hero--half-mask h-[calc(100vh-4.37rem)]';
  } else {
    heroClass += ' page-hero--mask h-[42vh]';
  }

  return (
    <section 
      className={classNames('page-hero bg-black text-white relative bg-no-repeat bg-center bg-cover', heroClass)} 
      aria-label={ariaLabel ? ariaLabel : undefined}
      style={{ backgroundImage: `url(${img})` }}  
    >
      { currentPage === 'indexPage' ? (
        <div className="page-hero__container container relative h-full">
          <div className="page-hero_content text-white absolute left-0 bottom-[15%] sm:max-w-[250px] sm:bottom-[10%] md:max-w-[205px] lg:max-w-[375px] xl:max-w-[500px] xl:px-4">
            <h1 className="page-hero__title mb-6">
              {title}
            </h1>
            <p className="mb-6">
              {copy}
            </p>
            <Btn 
              className='btn--primary btn--large'
              to='/register'
              ariaLabel='Sign Up'
            >
              Sign Up
            </Btn>
          </div>
        </div>
      ) : null }
    </section>
  );
}

export default PageHero;