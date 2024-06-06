import { PageHeaderProps } from "../PageTemplateTypes";
import './PageHeader.scss';
import { Link } from "react-router-dom";

const PageHeader = ({ headerData, children }: PageHeaderProps ) => {
  const { title, copy } = headerData

  return (
    <header className="page-header bg-white py-4">
    <div className="container flex justify-between">
      <div className="page-header__content w-1/2">
        <h1 className="mb-4">{title}</h1>
        <h3>{copy}</h3>
      </div>
      <nav className="page-header__nav w-2/5 pt-2">
        <ul className="page-header__nav-list flex justify-between">
         {children}
        </ul>
      </nav>
    </div>
  </header>
  );
}

export default PageHeader;