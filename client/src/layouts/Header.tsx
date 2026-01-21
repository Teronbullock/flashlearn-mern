import { Link } from "react-router-dom";
import { Nav } from "@layouts/Nav/Nav";
import { MobileMenuBtn } from "@components/MobileMenuBtn/MobileMenuBtn";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { useNav } from "@hooks/useNav";

export default function Header() {
  const { token } = useAuthContext();
  const { isMobileMenuOpen, handleMobileToggle, handleLogout } = useNav();

  return (
    <header
      id="header"
      className="z-500 md:h-17.5 fixed left-0 top-0 h-16 w-full md:bg-white"
    >
      <div
        data-name="header__container"
        className="max-w-8xl relative mx-auto flex h-full items-center justify-between px-4"
      >
        <h2 className="md:text-dark-shade font-cursive md:w-45 m-0 font-normal text-white">
          {token ? (
            <Link className="text-lg" to={`/dashboard`}>
              FlashCard
            </Link>
          ) : (
            <Link className="text-lg" to="/">
              FlashCard
            </Link>
          )}
        </h2>
        <MobileMenuBtn
          onToggle={handleMobileToggle}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        <Nav
          onToggle={handleMobileToggle}
          onLogout={handleLogout}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      </div>
    </header>
  );
}
