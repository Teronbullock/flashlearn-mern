import { Btn } from "@components/Btn/Btn";
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
            userSlug && (
            <li>
              <Btn
                el="link"
                variants={{ style: "btn" }}
                className="nav-desktop__item"
                to={`/dashboard/${userSlug}`}
              >
                Home
              </Btn>
            </li>
            <li>
              <Btn
                el="link"
                variants={{ style: "btn" }}
                className="nav-desktop__item"
                to={`/set/user/${userSlug}/add`}
              >
                Create Set
              </Btn>
            </li>
            <li>
              <Btn
                el="link"
                variants={{ style: "btn" }}
                className="nav-desktop__item"
                to={`/profile/${userSlug}`}
              >
                Profile
              </Btn>
            </li>
            <li>
              <Btn className="btn--black p-3" onClick={onLogout}>
                Logout
              </Btn>
            </li>
            )
          </>
        ) : (
          <>
            <li className="nav-desktop__item">
              <Btn el="link" variants={{ style: "btn" }} to="/">
                Home
              </Btn>
            </li>
            <li className="nav-desktop__item">
              <Btn
                el="link"
                variants={{ style: "btn" }}
                className="nav__list-link"
                to="/register"
              >
                Sign Up
              </Btn>
            </li>
            <li className="nav-desktop__item mr-0">
              <Btn className="p-3" variants={{ color: "primary" }}>
                Login
              </Btn>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
