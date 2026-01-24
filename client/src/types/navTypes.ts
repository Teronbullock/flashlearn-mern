export type ToggleFn = () => void;
export type LogoutFn = (e: React.MouseEvent<HTMLButtonElement>) => void;
export type SetIsMobileMenuOpen = React.Dispatch<React.SetStateAction<boolean>>;
export type IsMobileMenuOpen = boolean;

export interface NavBase {
  onToggle: ToggleFn;
  onLogout: LogoutFn;
}

export interface NavType extends NavBase {
  isMobileMenuOpen: IsMobileMenuOpen;
}

export interface useNavType {
  handleMobileToggle: ToggleFn;
  handleLogout: LogoutFn;
  isMobileMenuOpen: IsMobileMenuOpen;
}

export interface MobileBtnProps {
  onToggle: ToggleFn;
  isMobileMenuOpen: IsMobileMenuOpen;
}
