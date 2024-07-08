import PageHero from "../layouts/PageComponents/PageHero";
import PageHeader from "../layouts/PageComponents/PageHeader";

const PageNotFound = () => {
  return (
    <main className="pageNotFound">
      <PageHero currentPage="pageNotFound" />
      <PageHeader currentPage="pageNotFound" />
      <h1>404 Page</h1>
    </main>
  );
}

export default PageNotFound;