import { PageTemplateProps } from "../PageTemplateTypes";
import PageHero from "../PageHero/PageHero";
import PageHeader from "../PageHeader/PageHeader";

const PageTemplate = ({ pageData, PageHeroData, children }: PageTemplateProps) => {
  const { mainClass } = pageData;

  return (
    <main className={`main ${mainClass}`}>
      <PageHero PageHeroData={PageHeroData} />
      <PageHeader />
     
      {children}
    </main>
  );
}

export default PageTemplate;