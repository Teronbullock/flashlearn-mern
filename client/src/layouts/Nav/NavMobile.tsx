import { useAuthContext } from "@/hooks/index";
import { NavType } from "@app-types/navTypes";
import { Btn, BtnLink } from "@components/btn";
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
              <BtnLink to="/" onClick={onToggle}>
                Home
              </BtnLink>
            </li>
            <li className="mb-[1.75rem]">
              <BtnLink to="/register" onClick={onToggle}>
                About
              </BtnLink>
            </li>
            <li className="mb-[1.75rem]">
              <BtnLink to="/#how-it-works" onClick={onToggle}>
                How It Works
              </BtnLink>
            </li>
            <li className="mb-[1.75rem]">
              <BtnLink to="/#testimonials" onClick={onToggle}>
                Testimonials
              </BtnLink>
            </li>
            <li className="mb-[1.75rem]">
              <BtnLink
                variants={{ color: "primary", style: "btn" }}
                to="/register"
                onClick={onToggle}
              >
                Sign Up
              </BtnLink>
            </li>
            <li className="">
              <BtnLink
                to="/login"
                variants={{ color: "outline-primary", style: "btn" }}
                onClick={onToggle}
              >
                Log in
              </BtnLink>
            </li>
          </>
        ) : (
          <>
            userSlug && (
            <li className="">
              <BtnLink to={`/${userSlug}/dashboard`} onClick={onToggle}>
                Dashboard
              </BtnLink>
            </li>
            <li className="">
              <BtnLink to={`/set/user/${userSlug}/add`} onClick={onToggle}>
                Create Set
              </BtnLink>
            </li>
            <li className="">
              <BtnLink to={`/profile/${userSlug}`} onClick={onToggle}>
                My Profile
              </BtnLink>
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
