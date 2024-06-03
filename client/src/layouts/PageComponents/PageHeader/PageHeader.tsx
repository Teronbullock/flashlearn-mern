const PageHeader = ({ heroClass, ariaLabel, title, subtitle, img }) => {
  return (
    <header className="page-header">
    <div className="container">
      <div className="page-header__content">
        <h1>Page Header</h1>
        <h2>Subtitle</h2>
      </div>
      <nav>
        
      </nav>
    </div>
  </header>
  );
}

export default PageHeader;