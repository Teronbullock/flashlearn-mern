import { Btn } from "@components/Btn/Btn";
import { useAuthContext } from "@hooks/useAuthContext";
import { LogoutFn } from "@app-types/navTypes";

export const NavDesktop = ({ onLogout }: { onLogout: LogoutFn }) => {
  const { token, userSlug } = useAuthContext();

  return (
    <div data-name="nav-desktop" className="hidden md:block">
      <ul className="text-dark m-0 flex list-none items-center justify-end ps-0">
        {!token ? (
          <>
            <li className="mx-4 my-0">
              <Btn el="link" variants={{ style: "btn" }} to="/">
                Home
              </Btn>
            </li>
            <li className="mx-4 my-0">
              <Btn
                el="link"
                variants={{ style: "btn" }}
                className="text-black"
                to="/register"
              >
                Sign Up
              </Btn>
            </li>
            <li className="mx-4 my-0 mr-0">
              <Btn
                el="link"
                to="/login"
                className="p-3"
                variants={{ color: "primary", style: "btn" }}
              >
                Login
              </Btn>
            </li>
          </>
        ) : (
          <>
            {userSlug && (
              <>
                <li>
                  <Btn
                    el="link"
                    variants={{ style: "btn" }}
                    className="mx-4 my-0"
                    to={`/dashboard/${userSlug}`}
                  >
                    Home
                  </Btn>
                </li>
                <li>
                  <Btn
                    el="link"
                    variants={{ style: "btn" }}
                    className="mx-4 my-0"
                    to={`/set/user/${userSlug}/add`}
                  >
                    Create Set
                  </Btn>
                </li>
                <li>
                  <Btn
                    el="link"
                    variants={{ style: "btn" }}
                    className="mx-4 my-0"
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
              </>
            )}
          </>
        )}
      </ul>
    </div>
  );
};
