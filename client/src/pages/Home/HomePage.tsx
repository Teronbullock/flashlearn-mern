import {
  SectionOneCol,
  TwoColImage,
  TwoColTimeline,
  // Testimonials,
} from "@components/layout/sections";
import { IndexPageHero } from "@feats/home/components";
import indexPageContext from "@content/indexPage.json";
import { CTASection } from "@components/CTASection";
import { BtnLink } from "@components/btn";
import { Main } from "@layouts/Main";
import { Container } from "@layouts/Container";
import { Testimonials } from "@components/layout/sections/Testimonials";

const HomePage = () => {
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
    <Main width="full" className="pt-0!">
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
        <Container as="div">
          <SectionOneCol
            title={sectionOne.title}
            subTitle={sectionOne.subTitle}
            className="md:mt-15 px-4"
          />
          <TwoColImage {...sectionTwo} />
          <TwoColImage
            isReversed={true}
            {...sectionThree}
            className={{ main: "mb-14" }}
          />
          <TwoColTimeline
            title={sectionFour.title}
            cards={sectionFour.timelineCards}
          />
          <Testimonials {...testimonials} />
          <CTASection {...ctaSection} />
        </Container>
      </>
    </Main>
  );
};

export default HomePage;
