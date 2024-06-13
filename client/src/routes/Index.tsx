import PageTemplate from '../components-layouts/PageComponents/PageTemplate';
import SectionFeat from '../components/SectionFeat/SectionFeat';
import pageContent from '../data/page-content.json';

export default function Home() {

  return (
    <>
      <PageTemplate
        pageData={pageContent.indexPage}
      >
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
      </PageTemplate>
    {/* <main className='main main--home'>
      <Hero
        heroAriaLabel='Image of a person sitting on the floor with their back on a couch while using a laptop to study. Photo by Thought Catalog on Unsplash'
        content={{
          title: 'Quick, Easy, Study in a Flash!',
          copy: 'Studying made easy with FlashCard. Create your own flashcards and study them online.'
        }}
      />
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
    </main> */}
    </>
  )
}