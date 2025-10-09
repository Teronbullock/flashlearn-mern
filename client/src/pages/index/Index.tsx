import { Testimonials } from "../../components/Testimonials";
import { TwoColTimeline } from "../../components/TwoColTimeline";
import { SectionOneCol, TwoColImage } from "@components/layout/sections";
import { IndexPageHero } from "@pages/index/components";
import indexPageContext from "@content/indexPage.json";
import { CTASection } from "@components/CTASection";
import { BtnLink } from "@components/btn";
import { Main } from "@layouts/Main";

const Index = () => {
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
    <Main>
      <>
        <IndexPageHero {...hero}>
          <BtnLink
            variants={{
              color: "primary",
              style: "btn",
            }}
            to="/register"
            className="mr-4"
          >
            Get Started for Free
          </BtnLink>
          <BtnLink
            variants={{
              color: "outline-white",
              style: "btn",
            }}
            to="/login"
            className="text-white"
          >
            Log in
          </BtnLink>
        </IndexPageHero>
        <SectionOneCol
          title={sectionOne.title}
          subTitle={sectionOne.subTitle}
          className="px-4 md:mt-[3.75rem]"
        />
        <TwoColImage {...sectionTwo} />
        <TwoColImage
          isReversed={true}
          {...sectionThree}
          className={{ main: "mb-[3.5rem]" }}
        />
        <TwoColTimeline data={sectionFour} />
        <Testimonials {...testimonials} />
        <CTASection data={ctaSection} />
      </>
    </Main>
  );
};

export default Index;
