import { SectionOneCol } from "@components/layout/sections";
import { IndexPageHero } from "@feats/home/components";
import { CTASection } from "@components/composed/cta";
import { ButtonLink } from "@components/ui/button";
import { Main } from "@components/layout/main/Main";
import { Container } from "@components/layout/container/Container";
import { Testimonials } from "@components/display/testimonials/Testimonials";
import {
  TwoColImage,
  TwoColTimeline,
} from "@components/display/two-col-section";
import indexPageContext from "@content/indexPage.json";

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
          <ButtonLink
            variants={{
              color: "primary",
              style: "btn",
            }}
            to="/register"
            className="mr-4"
          >
            Get Started for Free
          </ButtonLink>
          <ButtonLink
            variants={{
              color: "outline-white",
              style: "btn",
            }}
            to="/login"
            className="text-white"
          >
            Log in
          </ButtonLink>
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
