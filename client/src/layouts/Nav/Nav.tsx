import { NavDesktop } from "./NavDesktop";
import { NavMobile } from "./NavMobile";
import classNames from "classnames";
import { NavType } from "@app-types/navTypes";

export const Nav = ({ isMobileMenuOpen, onToggle, onLogout }: NavType) => {
  return (
    <nav id="nav" {...(isMobileMenuOpen && { className: classNames("open") })}>
      <NavMobile
        onToggle={onToggle}
        onLogout={onLogout}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <NavDesktop onLogout={onLogout} />
    </nav>
  );
};
