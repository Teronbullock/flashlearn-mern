import { JSX } from "react";

export type RouteConfig = {
  path: string;
  element: React.LazyExoticComponent<() => JSX.Element>;
  name?: string;
};

export { PUBLIC_ROUTES } from "./public";
export { PROTECTED_ROUTES } from "./protected";

export { ERROR_ROUTES } from "./error";
