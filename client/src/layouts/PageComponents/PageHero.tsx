import { CurrentPageInterface } from './types/page-types';
import './page-components.scss';
import Btn from '../../components/Btn/Btn';
import classNames from 'classnames';
import PageContentFile from '../../data/page-content.json';

const PageHero = ({ currentPage, className }: CurrentPageInterface) => {

  const currentPageContent = PageContentFile[currentPage];
  const { ariaLabel, img } = currentPageContent.hero;
  const { title, copy } = currentPageContent.header;

  const heroClass = classNames(
    'page-hero bg-black text-white relative bg-no-repeat bg-center bg-cover',
    {'page-hero--half-mask h-[calc(100vh-3.56rem)] md:h-[calc(100vh-4.37rem)] px-4': currentPage === 'indexPage'},
    {'h-[20vh] md:h-[42vh]': currentPage !== 'indexPage'},
    className
  );

  return (
    <section
      className={heroClass}
      aria-label={ariaLabel && ariaLabel }
      style={{ backgroundImage: `url(${img})` }}
    >
      {currentPage === 'indexPage' && (
        <div className='page-hero__container container relative h-full'>
          <div className='page-hero_content text-white absolute left-0 bottom-[15%] sm:max-w-[250px] sm:bottom-[10%] md:max-w-[205px] lg:max-w-[375px] xl:max-w-[500px] xl:px-4'>
            <h1 className='page-hero__title mb-6'>{title}</h1>
            <p className='mb-6'>{copy}</p>
            <Btn
              className='btn--primary btn--large'
              to='/register'
            >
              Sign Up
            </Btn>
          </div>
        </div>
      )}
    </section>
  );
};

export default PageHero;
