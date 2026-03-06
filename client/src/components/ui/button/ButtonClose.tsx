import { Link } from "react-router-dom";

export const ButtonClose = () => {
  return (
    <Link
      className="btn-close z-100 absolute right-6 top-4 cursor-pointer text-2xl text-black"
      to="/"
      aria-label="Close Button"
    >
      X
    </Link>
  );
};
