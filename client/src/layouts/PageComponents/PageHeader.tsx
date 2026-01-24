import { PageHeaderProps, HeaderInterface } from "./types/page-types";

const PageHeader = ({ currentPage, children }: PageHeaderProps) => {
  const { title, copy } = pageContent.header as HeaderInterface;

  return (
    <header className="page-header bg-white py-2 md:py-4">
      {currentPage !== "indexPage" && (
        <div className="container flex flex-col justify-between md:flex-row">
          <div className="page-header__content mb-3 w-full md:mb-0 md:w-1/2">
            <h1 className="mb-2 text-2xl md:text-4xl">{title}</h1>
            <p className="md:text-xl">{copy}</p>
          </div>
          {children && (
            <>
              <span className="divider-v hidden md:inline"></span>
              <div className="page-header__nav mb-2 pt-2 sm:w-[50%] md:mb-0 md:w-[45%]">
                <ul className="page-header__nav-list flex justify-between md:justify-start">
                  {children}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default PageHeader;
