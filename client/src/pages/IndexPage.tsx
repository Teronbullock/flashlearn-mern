import { SectionOneCol } from "@components/SectionOneCol";
import { PageHero } from "@layouts/PageComponents/PageHero";
import indexPageContext from "@content/indexPage.json";
import { TwoColImage } from "@components/TwoColImage";
import { SectionTwoCol } from "@components/SectionTwoCol";
import { TimelineCard } from "@components/TimelineCard";

export const IndexPage = () => {
  const { hero, sectionOne, sectionTwo, sectionThree, sectionFour } =
    indexPageContext;

  return (
    <main className="main main--index">
      <PageHero
        title={hero.title}
        copy={hero.copy}
        img={hero.img}
        ariaLabel={hero.ariaLabel}
      />
      <SectionOneCol data={sectionOne} className="mt-[3.75rem]" />
      <TwoColImage {...sectionTwo} />
      <TwoColImage isReversed={true} {...sectionThree} />
      <SectionTwoCol
        className={{ container: "bg-light rounded-[20px] p-8" }}
        header={{ title: sectionFour.header, className: "mb-[5rem]" }}
      >
        <div
          className="mb-[4rem] justify-items-center md:mb-[2rem] md:basis-[50%]"
          data-js="section-two-col-left"
        >
          <div className="border-primary rotate-11 h-[350px] w-[400px] rounded-[20px] border bg-[url(assets/img/woman-with-tablet.webp)] bg-no-repeat"></div>
          <div className="border-primary -rotate-11 h-[350px] w-[400px] rounded-[20px] border bg-[url(assets/img/student-with-a-book.webp)] bg-cover bg-no-repeat"></div>
        </div>
        <div className="md:pt-[4rem]" data-js="section-two-col-right">
          <TimelineCard
            number="01"
            {...sectionFour.cardOne}
            className="pb-[6.75rem]"
          />
          <TimelineCard
            number="02"
            {...sectionFour.cardTwo}
            className="pb-[6.75rem]"
          />
          <TimelineCard number="03" isLast {...sectionFour.cardThree} />
        </div>
      </SectionTwoCol>
    </main>
  );
};
