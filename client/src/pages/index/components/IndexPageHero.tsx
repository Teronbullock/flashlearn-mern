import "./page-components.scss";
import classNames from "classnames";

interface IndexPageHeroProps {
  children?: React.ReactNode;
  title: string;
  copy?: string;
  className?: string;
  img: string;
  ariaLabel: string;
}

export const IndexPageHero = ({
  children,
  className,
  title,
  copy,
  img,
  ariaLabel,
}: IndexPageHeroProps) => {
  const heroClass = classNames(
    "page-hero bg-black text-white relative bg-no-repeat bg-center bg-cover page-hero--mask h-screen px-4",
    className,
  );

  return (
    <section
      className={heroClass}
      aria-label={ariaLabel && ariaLabel}
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="page-hero__container max-w-8xl relative mx-auto h-full">
        {title && (
          <div className="page-hero_content absolute left-0 top-[42%] text-white sm:top-[50%] md:max-w-[600px]">
            <h2 className="mb-6 text-xl">{title}</h2>
            <p className="mb-7 text-base">{copy}</p>
            {children}
          </div>
        )}
      </div>
    </section>
  );
};
