import { Button, ButtonLink } from "@components/ui/button";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { LogoutFn } from "@/types/index/navTypes";

export const NavDesktop = ({ onLogout }: { onLogout: LogoutFn }) => {
  const { token } = useAuthContext();

  return (
    <div data-name="nav-desktop" className="hidden md:block">
      <ul className="text-dark m-0 flex list-none items-center justify-end ps-0">
        {!token ? (
          <>
            <li className="mx-4 my-0">
              <ButtonLink variants={{ style: "btn" }} to="/">
                Home
              </ButtonLink>
            </li>
            <li className="mx-4 my-0">
              <ButtonLink
                variants={{ style: "btn" }}
                className="text-black"
                to="/register"
              >
                Sign Up
              </ButtonLink>
            </li>
            <li className="mx-4 my-0 mr-0">
              <ButtonLink
                to="/login"
                className="p-3"
                variants={{ color: "primary", style: "btn" }}
              >
                Login
              </ButtonLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink
                variants={{ style: "btn" }}
                className="mx-4 my-0"
                to={`/dashboard`}
              >
                Dashboard
              </ButtonLink>
            </li>
            <li>
              <ButtonLink
                variants={{ style: "btn" }}
                className="mx-4 my-0"
                to={`/set/add`}
              >
                Create Set
              </ButtonLink>
            </li>
            <li>
              <ButtonLink
                variants={{ style: "btn" }}
                className="mx-4 my-0"
                to={`/profile/`}
              >
                Profile
              </ButtonLink>
            </li>
            <li>
              <Button className="btn--black p-3" onClick={onLogout}>
                Logout
              </Button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
