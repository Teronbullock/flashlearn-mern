import { ListItemLink } from "@components/ListItemLink/ListItemLink";
import { ListLinkBtn } from "@components/ListLinkBtn/ListLinkBtn";
import { useAuthContext } from "@hooks/useAuthContext";
import { NavBase } from "@app-types/navTypes";
import "./nav.scss";

export const NavMobile = ({ onToggle, onLogout }: NavBase) => {
  const { token, userSlug } = useAuthContext();
  return (
    <div id="js-nav-mobile" className="nav-mobile bg-light">
      <ul className="nav-mobile__list nav-mobile--flex text-dark text-[1.125rem] font-light">
        {token ? (
          <>
            <ListItemLink
              itemClass="mobile-nav"
              to={`/dashboard/${userSlug}`}
              onClick={onToggle}
            >
              Home
            </ListItemLink>
            <ListItemLink
              itemClass="mobile-nav"
              to={`/set/user/${userSlug}/add`}
              onClick={onToggle}
            >
              Create Set
            </ListItemLink>
            {userSlug && (
              <ListItemLink
                itemClass="mobile-nav"
                to={`/profile/${userSlug}`}
                onClick={onToggle}
              >
                Profile
              </ListItemLink>
            )}
            <ListLinkBtn listItemClass="nav-mobile__item" onClick={onLogout}>
              Logout
            </ListLinkBtn>
          </>
        ) : (
          <>
            <ListItemLink itemClass="mobile-nav" to="/" onClick={onToggle}>
              Home
            </ListItemLink>
            <ListItemLink
              itemClass="mobile-nav"
              to="/register"
              onClick={onToggle}
            >
              About
            </ListItemLink>
            <ListItemLink
              itemClass="mobile-nav"
              to="/#how-it-works"
              onClick={onToggle}
            >
              How It Works
            </ListItemLink>
            <ListItemLink
              itemClass="mobile-nav"
              to="/#testimonials"
              onClick={onToggle}
            >
              Testimonials
            </ListItemLink>
            <ListItemLink
              itemClass="mobile-nav"
              variant="primary"
              to="/register"
              onClick={onToggle}
            >
              Sign Up
            </ListItemLink>
            <ListItemLink
              itemClass="mobile-nav"
              to="/login"
              variant="outline"
              className="mx-2 mt-2 p-1"
              onClick={onToggle}
            >
              Log in
            </ListItemLink>
          </>
        )}
      </ul>
    </div>
  );
};
