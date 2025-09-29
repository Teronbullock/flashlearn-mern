import { Testimonials } from "./../components/Testimonials";
import { TwoColTimeline } from "./../components/TwoColTimeline";
import { SectionOneCol } from "@components/SectionOneCol";
import { PageHero } from "@layouts/PageComponents/PageHero";
import indexPageContext from "@content/indexPage.json";
import { TwoColImage } from "@components/TwoColImage";
import { CTASection } from "@components/CTASection";

export const IndexPage = () => {
  const {
    hero,
    sectionOne,
    sectionTwo,
    sectionThree,
    sectionFour,
    sectionFive,
    ctaSection,
  } = indexPageContext;

  return (
    <main className="main main--index mb-12">
      <PageHero
        title={hero.title}
        copy={hero.copy}
        img={hero.img}
        ariaLabel={hero.ariaLabel}
      />
      <SectionOneCol data={sectionOne} className="mt-[3.75rem]" />
      <TwoColImage {...sectionTwo} />
      <TwoColImage
        isReversed={true}
        {...sectionThree}
        className={{ main: "mb-[3.5rem]" }}
      />
      <TwoColTimeline data={sectionFour} />
      <Testimonials data={sectionFive} />
      <CTASection data={ctaSection} />
    </main>
  );
};
