import "./page-components.scss";
import { Btn } from "@components/Btn/Btn";
import classNames from "classnames";

interface HeroProps {
  title: string;
  copy?: string;
  className?: string;
  img: string;
  ariaLabel: string;
}

export const PageHero = ({
  className,
  title,
  copy,
  img,
  ariaLabel,
}: HeroProps) => {
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
      {title && (
        <div className="page-hero__container max-w-8xl relative mx-auto h-full">
          <div className="page-hero_content absolute left-0 top-[42%] text-white sm:top-[50%] md:max-w-[600px]">
            <h2 className="mb-6 text-xl">{title}</h2>
            <h3 className="mb-7 text-base">{copy}</h3>
            <Btn
              el="link"
              variants={{
                color: "primary",
                style: "btn",
              }}
              to="/register"
              className="mr-4"
            >
              Get Started for Free
            </Btn>
            <Btn
              el="link"
              variants={{
                color: "outline-white",
                style: "btn",
              }}
              to="/login"
              className="text-white"
            >
              Log in
            </Btn>
          </div>
        </div>
      )}
    </section>
  );
};
