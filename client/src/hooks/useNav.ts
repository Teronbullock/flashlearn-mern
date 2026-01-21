import { useState } from "react";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { useNavType } from "@/types/index/navTypes";

export const useNav = (): useNavType => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuthContext();

  const handleMobileToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (logout) {
      logout();
      handleMobileToggle();
    }
  };

  return {
    handleMobileToggle,
    handleLogout,
    isMobileMenuOpen,
  };
};
