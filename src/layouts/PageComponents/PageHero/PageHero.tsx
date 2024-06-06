import { PageHeroProps } from '../PageTemplateTypes';
import './PageHero.scss';
import Btn from '../../../components/Btn/Btn';

const PageHero = ({ heroData }: PageHeroProps) => {
  const {
    type, 
    ariaLabel,
    img,
    title,
    copy,
  } = heroData;

  let {
    heroClass,
  } = heroData;
  
  if (type === 'index') {
    heroClass += ' page-hero--half-mask h-[calc(100vh-4.37rem)]';
  } else {
    heroClass += ' page-hero-mask h-[42vh]';
  }

  return (
    <section 
      className={`page-hero bg-black text-white relative bg-no-repeat bg-center bg-cover ${heroClass}`} 
      aria-label={ariaLabel ? ariaLabel : undefined}
      style={{ backgroundImage: `url(${img})` }}  
    >
      { type === 'index' ? (
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