import PageHero from '../layouts/PageComponents/PageHero';
import PageHeader from '../layouts/PageComponents/PageHeader';
import SectionFeat from '../components/SectionFeat/SectionFeat';



export default function Home() {

  return (
    <main className="main main-indexPage" >
    <PageHero currentPage={'indexPage'}  />
    <PageHeader currentPage={'indexPage'} />
        <SectionFeat 
      classObj={{
        section: 'py-8',
        container: 'md:flex' 
      }}
      img={{
        src: '/assets/img/kojo-kwarteng-KUzlAah2dog-unsplash.jpg',
        alt: 'Image of a person studying using a laptop. Photo by Kojo Kwarteng on Unsplash'
      }}
      title='Studying Made Easy'
      copy='Flashcard allows you to create your own flashcards to study from. Sign-up is free and is easy to get started.'
    />
    <SectionFeat
      classObj={{
        section: 'py-8',
        container: 'md:flex md:flex-row-reverse' 
      }}
      img={{
        src: '/assets/img/anete-lusina--4Wi_ii6StY-unsplash.jpg',
        alt: 'Image of a person studying using a laptop. Photo by Anete Lūsiņa on Unsplash'
      }}
      title='Save Time'
      copy='Spend more time studing and lease time writing out your notes.'
    />
    </main>
  );
}