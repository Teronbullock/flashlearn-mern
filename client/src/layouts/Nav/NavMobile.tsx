import { useAuthContext } from "@hooks/useAuthContext";
import { NavType } from "@app-types/navTypes";
import { Btn } from "@components/Btn/Btn";
import classNames from "classnames";

export const NavMobile = ({
  onToggle,
  onLogout,
  isMobileMenuOpen,
}: NavType) => {
  const { token, userSlug } = useAuthContext();

  const containerClass = classNames(
    "nav-mobile bg-light fixed right-0 top-0 z-[100] h-full w-0 overflow-x-hidden text-center transition-[0.2s] md:hidden",
    { "w-full": isMobileMenuOpen },
  );

  return (
    <div id="js-nav-mobile" className={containerClass}>
      <ul className="text-dark px-4 pb-8 pt-16 text-[1.125rem] font-light">
        {!token ? (
          <>
            <li className="mb-[1.75rem]">
              <Btn el="link" to="/" onClick={onToggle}>
                Home
              </Btn>
            </li>
            <li className="mb-[1.75rem]">
              <Btn el="link" to="/register" onClick={onToggle}>
                About
              </Btn>
            </li>
            <li className="mb-[1.75rem]">
              <Btn el="link" to="/#how-it-works" onClick={onToggle}>
                How It Works
              </Btn>
            </li>
            <li className="mb-[1.75rem]">
              <Btn el="link" to="/#testimonials" onClick={onToggle}>
                Testimonials
              </Btn>
            </li>
            <li className="mb-[1.75rem]">
              <Btn
                el="link"
                variants={{ color: "primary", style: "btn" }}
                to="/register"
                onClick={onToggle}
              >
                Sign Up
              </Btn>
            </li>
            <li className="">
              <Btn
                el="link"
                to="/login"
                variants={{ color: "outline-primary", style: "btn" }}
                onClick={onToggle}
              >
                Log in
              </Btn>
            </li>
          </>
        ) : (
          <>
            userSlug && (
            <li className="">
              <Btn el="link" to={`/dashboard/${userSlug}`} onClick={onToggle}>
                Home
              </Btn>
            </li>
            <li className="">
              <Btn
                el="link"
                to={`/set/user/${userSlug}/add`}
                onClick={onToggle}
              >
                Create Set
              </Btn>
            </li>
            <li className="">
              <Btn el="link" to={`/profile/${userSlug}`} onClick={onToggle}>
                My Profile
              </Btn>
            </li>
            <li className="">
              <Btn onClick={onLogout}>Logout</Btn>
            </li>
            )
          </>
        )}
      </ul>
    </div>
  );
};
