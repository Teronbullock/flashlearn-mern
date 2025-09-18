import { Btn } from "../../components/Btn/Btn";
import { ListItemLink } from "@components/ListItemLink/ListItemLink";
import { ListLinkBtn } from "@components/ListLinkBtn/ListLinkBtn";
import { useAuthContext } from "@hooks/useAuthContext";
import { LogoutFn } from "@app-types/navTypes";
import "./nav.scss";

export const NavDesktop = ({ onLogout }: { onLogout: LogoutFn }) => {
  const { token, userSlug } = useAuthContext();

  return (
    <div className="nav-desktop">
      <ul className="nav-desktop__list nav-desktop--flex">
        {token ? (
          <>
            <ListItemLink
              className="nav-desktop__item"
              to={`/dashboard/${userSlug}`}
            >
              Home
            </ListItemLink>
            <ListItemLink
              className="nav-desktop__item"
              to={`/set/user/${userSlug}/add`}
            >
              Create Set
            </ListItemLink>
            {userSlug && (
              <ListItemLink
                className="nav-desktop__item"
                to={`/profile/${userSlug}`}
              >
                Profile
              </ListItemLink>
            )}
            <Btn className="btn--black p-3" onClick={onLogout}>
              Logout
            </Btn>
          </>
        ) : (
          <>
            <ListItemLink listClassName="nav-desktop__item" to="/">
              Home
            </ListItemLink>
            <ListItemLink
              listClassName="nav-desktop__item"
              className="nav__list-link"
              to="/register"
            >
              Sign Up
            </ListItemLink>
            <ListLinkBtn
              listClassName="nav-desktop__item mr-0"
              className="p-3"
              variant="primary"
            >
              Login
            </ListLinkBtn>
          </>
        )}
      </ul>
    </div>
  );
};
