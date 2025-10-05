import { Link } from "react-router-dom";
import { Nav } from "@layouts/Nav/Nav";
import { MobileMenuBtn } from "@components/MobileMenuBtn/MobileMenuBtn";
import { useAuthContext } from "@hooks/useAuthContext";
import { useNav } from "@hooks/useNav";

export default function Header() {
  const { token, userSlug } = useAuthContext();
  const { isMobileMenuOpen, handleMobileMenu, handleLogout } = useNav();

  return (
    <header className="header fixed left-0 top-0 z-[500] h-[64px] w-full px-[1rem] md:h-[70px] md:bg-white">
      <div className="header__container max-w-8xl relative mx-auto flex h-full items-center justify-between px-4">
        <h2 className="md:text-dark-shade font-cursive m-0 font-normal text-white md:w-[180px]">
          {token ? (
            <Link className="text-lg" to={`/dashboard/${userSlug}`}>
              FlashCard
            </Link>
          ) : (
            <Link className="text-lg" to="/">
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
