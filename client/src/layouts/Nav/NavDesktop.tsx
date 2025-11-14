import { Btn, BtnLink } from "@components/btn";
import { useAuthContext } from "@/hooks/index";
import { LogoutFn } from "@app-types/navTypes";

export const NavDesktop = ({ onLogout }: { onLogout: LogoutFn }) => {
  const { token, userSlug } = useAuthContext();

  return (
    <div data-name="nav-desktop" className="hidden md:block">
      <ul className="text-dark m-0 flex list-none items-center justify-end ps-0">
        {!token ? (
          <>
            <li className="mx-4 my-0">
              <BtnLink variants={{ style: "btn" }} to="/">
                Home
              </BtnLink>
            </li>
            <li className="mx-4 my-0">
              <BtnLink
                variants={{ style: "btn" }}
                className="text-black"
                to="/register"
              >
                Sign Up
              </BtnLink>
            </li>
            <li className="mx-4 my-0 mr-0">
              <BtnLink
                to="/login"
                className="p-3"
                variants={{ color: "primary", style: "btn" }}
              >
                Login
              </BtnLink>
            </li>
          </>
        ) : (
          <>
            {userSlug && (
              <>
                <li>
                  <BtnLink
                    variants={{ style: "btn" }}
                    className="mx-4 my-0"
                    to={`/dashboard`}
                  >
                    Dashboard
                  </BtnLink>
                </li>
                <li>
                  <BtnLink
                    variants={{ style: "btn" }}
                    className="mx-4 my-0"
                    to={`/set/add`}
                  >
                    Create Set
                  </BtnLink>
                </li>
                <li>
                  <BtnLink
                    variants={{ style: "btn" }}
                    className="mx-4 my-0"
                    to={`/${userSlug}/profile/`}
                  >
                    Profile
                  </BtnLink>
                </li>
                <li>
                  <Btn className="btn--black p-3" onClick={onLogout}>
                    Logout
                  </Btn>
                </li>
              </>
            )}
          </>
        )}
      </ul>
    </div>
  );
};
