import { useState } from 'react';
import { useAuthContext } from '@hooks/useAuthContext';
import { useNavType } from '@app-types/navTypes';

export const useNav = (): useNavType => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuthContext();

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (logout) {
      logout();
      handleMobileMenu();
    }
  };

  return {
    handleMobileMenu,
    handleLogout,
    isMobileMenuOpen,
  };
};
