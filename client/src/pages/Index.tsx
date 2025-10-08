import { Testimonials } from "../components/Testimonials";
import { TwoColTimeline } from "../components/TwoColTimeline";
import { SectionOneCol } from "@components/SectionOneCol";
import { PageHero } from "@layouts/PageComponents/PageHero";
import indexPageContext from "@content/indexPage.json";
import { TwoColImage } from "@components/TwoColImage";
import { CTASection } from "@components/CTASection";

export const Index = () => {
  const {
    hero,
    sectionOne,
    sectionTwo,
    sectionThree,
    sectionFour,
    testimonials,
    ctaSection,
  } = indexPageContext;

  return (
    <main className="main main--index mb-12">
      <PageHero {...hero} />
      <SectionOneCol data={sectionOne} className="px-4 md:mt-[3.75rem]" />
      <TwoColImage {...sectionTwo} />
      <TwoColImage
        isReversed={true}
        {...sectionThree}
        className={{ main: "mb-[3.5rem]" }}
      />
      <TwoColTimeline data={sectionFour} />
      <Testimonials {...testimonials} />
      <CTASection data={ctaSection} />
    </main>
  );
};

export default Index;
