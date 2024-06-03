import { PageHeroProps } from '../PageTemplateTypes';
import './PageHero.scss';
import Btn from '../../../components/Btn/Btn';

const PageHero = ({ PageHeroData }: PageHeroProps) => {
  const {
    isIndexPage = false, 
    altSection,
    ariaLabel,
    contentClass,
    title,
    subtitle,
    copy,
    img,
  } = PageHeroData;

  let {
    heroClass,
    containerClass
  } = PageHeroData;
  
  if (isIndexPage) {
    heroClass += ' page-hero--mask min-h-[calc(100vh-4.37rem)]';
    containerClass += ' h-full bottom-[15%] left-0 py-0 px-4';
  } else {
    heroClass += ' min-h-[calc(50vh-3.75rem)]';
    containerClass += ' py-5  ';
  }

  if (altSection) {
    containerClass += ' page-hero__container--alt';
  }



  return (
    <section 
      className={`page-hero bg-black text-white relative bg-no-repeat bg-center bg-cover ${heroClass}`} 
      aria-label={ariaLabel ? ariaLabel : undefined}
      style={{ backgroundImage: `url(${img})` }}  
    >
      <div className={`page-hero__container container relative mx-auto ${containerClass}`}>

        <div className="page-hero_content absolute left-0 bottom-[15%] sm:max-w-[250px] sm:bottom-[10%] md:max-w-[205px] lg:max-w-[375px] xl:max-w-[500px] xl:px-4">
          <h1 className="page-hero_title text-white mb-6">{title}</h1>
          <p className="page-hero__copy">{copy}</p>
          <Btn 
            btnClass='btn--primary btn--large'
            btnURL='/register'
            btnAriaLabel='Sign Up'
          >
            Sign Up
          </Btn>
        </div>
      </div>
    </section>



        // <section 
        //   className={`section-page-header ${PageHeroClass}`}
        //   aria-label={ariaLabel ? ariaLabel : undefined}
        //   style={{ backgroundImage: `url(${img})` }}
        // >
        //   <div className={`section-page-header__container container py-5 relative ${headerContainerClass}`}>
        //     <div className={`section-page-header__content absolute ${contentClass}`}>
        //       <h1>{title}</h1>
        //       <h2>{subtitle}</h2>
        //     </div>
        //   </div>
        // </section>

  );
}

export default PageHero;