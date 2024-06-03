import PageTemplate from "../layouts/PageComponents/PageTemplate/PageTemplate"

const Dashboard = () => {
  return (
    <PageTemplate 
      pageData={{
        mainClass: 'main--dashboard',
      }}
      PageHeroData={{
        heroClass: 'page-header--dashboard',
        ariaLabel: 'Dashboard Page Header. This section contains the title and description. The background image is of a person with a black shirt studying. Photo by Anthony Riera on Unsplash.',
        title: 'Welcome to FlashCard',
        subtitle: 'To get started create a Set.',
        img: '/assets/img/anthony-riera-kylWNDQFd5A-unsplash.jpg'
      }}
    >
      <>
      </>
    </PageTemplate>
  )
}

export default Dashboard;