import './section-feat.scss';
import classNames from 'classnames';

interface sectionFeatProps {
  img: {
    src: string;
    alt: string;
    caption?: string;
  };
  content: {
    title: string;
    copy: string;
  };
  sectionClasses?: {
    sectionClass?: string;
    containerClass?: string;
  };
}


/**
 *  -- SectionFeat Component --
 * 
 * The SectionFeat component is a reusable component that displays a 
 * section with an image and content.
 * 
 * @param {object} img - The image object containing the src and alt
 *  attributes. 
 * @param {object} content - The content object containing the title and
 * copy attributes.
 * @param {object} sectionClasses - The sectionClasses object containing the
 * sectionClass and containerClass attributes.
 * 
 * @returns JSX.Element
 * 
 */
export default function SectionFeat({
  img,
  content,
  sectionClasses = { sectionClass: '', containerClass: ''},
} : sectionFeatProps): JSX.Element {
  const { title, copy } = content;
  const { src, alt, caption } = img;
  const { sectionClass, containerClass } = sectionClasses;

  return (
    <section className={classNames('section section-feature py-8', sectionClass)}>
      <div className={classNames('container md:flex', containerClass)}>
        <div className='section__header md:w-[50%]'>
          <img className='img rounded-lg' src={src} alt={alt} />
          <figcaption className='img__caption text-center mt-2 '>{caption}</figcaption>
        </div>
        <div className='section__content p-4 md:w-[50%]'>
          <div className='container'>
            <div className='section__content-header'>
              <h2 className='section__content-title my-3'>{title}</h2>
            </div>
            <div className='section__content-body pb-5'>
              <p className='section__content-copy'>{copy}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}