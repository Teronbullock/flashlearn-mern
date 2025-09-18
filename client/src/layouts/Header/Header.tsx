import { Link } from "react-router-dom";
import "./header.scss";
import { Nav } from "@layouts/Nav/Nav";
import { MobileMenuBtn } from "../../components/MobileMenuBtn/MobileMenuBtn";
import { useAuthContext } from "@hooks/useAuthContext";
import { useNav } from "@hooks/useNav";

export default function Header() {
  const { token, userSlug } = useAuthContext();
  const { isMobileMenuOpen, handleMobileMenu, handleLogout } = useNav();

  return (
    <header className="header fixed left-0 top-0 z-[500] h-[64px] w-full bg-[#ffffff80] px-[1rem] md:h-[70px]">
      <div className="header__container container relative mx-auto flex h-full items-center justify-between">
        <h2 className="header__site-title m-0 font-normal md:w-[180px]">
          {token ? (
            <Link
              className="header_site-title-link text-dark-shade"
              to={`/dashboard/${userSlug}`}
            >
              FlashCard
            </Link>
          ) : (
            <Link className="header_site-title-link text-dark-shade" to="/">
              FlashCard
            </Link>
          )}
        </h2>
        <MobileMenuBtn
          onToggle={handleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <Nav
          onToggle={handleMobileMenu}
          onLogout={handleLogout}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      </div>
    </header>
  );
}
