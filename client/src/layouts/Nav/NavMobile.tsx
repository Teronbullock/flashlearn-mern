import { useAuthContext } from "@hooks/useAuthContext";
import { NavBase } from "@app-types/navTypes";
import "./nav.scss";
import { Btn } from "@components/Btn/Btn";

export const NavMobile = ({ onToggle, onLogout }: NavBase) => {
  const { token, userSlug } = useAuthContext();
  return (
    <div id="js-nav-mobile" className="nav-mobile bg-light">
      <ul className="nav-mobile__list text-dark text-[1.125rem] font-light">
        {!token ? (
          <>
            <li className="nav-mobile__list-item mb-[1.75rem]">
              <Btn el="link" to="/" onClick={onToggle}>
                Home
              </Btn>
            </li>
            <li className="nav-mobile__list-item mb-[1.75rem]">
              <Btn el="link" to="/register" onClick={onToggle}>
                About
              </Btn>
            </li>
            <li className="nav-mobile__list-item mb-[1.75rem]">
              <Btn el="link" to="/#how-it-works" onClick={onToggle}>
                How It Works
              </Btn>
            </li>
            <li className="nav-mobile__list-item mb-[1.75rem]">
              <Btn el="link" to="/#testimonials" onClick={onToggle}>
                Testimonials
              </Btn>
            </li>
            <li className="nav-mobile__list-item mb-[1.75rem]">
              <Btn
                el="link"
                variants={{ type: "primary", style: "btn" }}
                to="/register"
                onClick={onToggle}
              >
                Sign Up
              </Btn>
            </li>
            <li className="nav-mobile__list-item">
              <Btn
                el="link"
                to="/login"
                variants={{ type: "outline-primary", style: "btn" }}
                onClick={onToggle}
              >
                Log in
              </Btn>
            </li>
          </>
        ) : (
          <>
            userSlug && (
            <li className="nav-mobile__list-item">
              <Btn el="link" to={`/dashboard/${userSlug}`} onClick={onToggle}>
                Home
              </Btn>
            </li>
            <li className="nav-mobile__list-item">
              <Btn
                el="link"
                to={`/set/user/${userSlug}/add`}
                onClick={onToggle}
              >
                Create Set
              </Btn>
            </li>
            <li className="nav-mobile__list-item">
              <Btn el="link" to={`/profile/${userSlug}`} onClick={onToggle}>
                My Profile
              </Btn>
            </li>
            <li className="nav-mobile__list-item">
              <Btn onClick={onLogout}>Logout</Btn>
            </li>
            )
          </>
        )}
      </ul>
    </div>
  );
};
