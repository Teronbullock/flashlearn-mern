import { useAuthContext } from "@feats/auth/context/AuthContext";
import { NavType } from "@/types/index/navTypes";
import { Btn, BtnLink } from "@components/btn";
import classNames from "classnames";

export const NavMobile = ({
  onToggle,
  onLogout,
  isMobileMenuOpen,
}: NavType) => {
  const { token } = useAuthContext();

  const containerClass = classNames(
    "nav-mobile bg-light fixed right-0 top-0 z-[100] h-full w-0 overflow-x-hidden text-center transition-[0.2s] md:hidden",
    { "w-full": isMobileMenuOpen },
  );

  const ulClassName =
    "text-dark flex flex-col px-4 pb-8 pt-16 text-[1.125rem] font-light h-full";

  return (
    <div id="js-nav-mobile" className={containerClass}>
      {!token ? (
        <ul className={classNames(ulClassName, "gap-2")}>
          <li className="mb-7">
            <BtnLink variants={{ style: "btn" }} to="/" onClick={onToggle}>
              Home
            </BtnLink>
          </li>
          <li className="mb-7">
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
              Login
            </BtnLink>
          </li>
        </ul>
      ) : (
        <ul className={classNames(ulClassName, "gap-5")}>
          <li className="">
            <BtnLink to={`/dashboard`} onClick={onToggle}>
              Dashboard
            </BtnLink>
          </li>
          <li className="">
            <BtnLink to={`/set/add`} onClick={onToggle}>
              Create Set
            </BtnLink>
          </li>
          <li className="">
            <BtnLink to={`/profile`} onClick={onToggle}>
              My Profile
            </BtnLink>
          </li>
          <li className="">
            <Btn
              className="rounded-lg bg-black py-2 text-white"
              onClick={onLogout}
            >
              Logout
            </Btn>
          </li>
        </ul>
      )}
    </div>
  );
};
