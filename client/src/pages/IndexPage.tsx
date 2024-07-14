import PageHero from '../layouts/PageComponents/PageHero';
import PageHeader from '../layouts/PageComponents/PageHeader';
import SectionFeat from '../components/SectionFeat/SectionFeat';
import PageContentFile from '../data/page-content.json';

const IndexPage = () => {
  const pageContent = PageContentFile.indexPage;
  const sections = pageContent.sections;
  const currentPage = 'indexPage';

  return (
    <main className='main main--index'>
      <PageHero currentPage={currentPage} />
      <PageHeader currentPage={currentPage} />
      <SectionFeat {...sections[0]} />
      <SectionFeat {...sections[1]} />
    </main>
  );
};

export default IndexPage;
