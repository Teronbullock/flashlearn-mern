import { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import Nav from '../Nav/Nav'; 
import MobileMenuBtn from '../../components/MobileMenuBtn/MobileMenuBtn';
import { useAuthContext } from '../../context/hooks/useAuthContext';

export default function Header() {
  const { token, userSlug } = useAuthContext();
  const [showMobileMenu, setShowMobileMenu] = useState('');

  const handleMobileMenu = () => {
    if (showMobileMenu) {
      setShowMobileMenu('');
    } else {
      setShowMobileMenu('open');
    }
  }

  return (
    <header className='header fixed top-0 left-0 w-full z-[500] h-[60px] md:h-[70px] bg-white'>
      <div className='header__container container mx-auto h-full flex justify-center items-center relative md:justify-between'>
        <h1 className='header__site-title m-0 md:w-[180px]'>
          { token ? (
            <Link className='header_site-title-link text-dark-shade' to={`/dashboard/${userSlug}`}>FlashCard</Link>
          ) : (
            <Link className='header_site-title-link text-dark-shade' to='/'>FlashCard</Link>
          )}
        </h1>
        <MobileMenuBtn
          onClick={handleMobileMenu}
        />
        <Nav 
          showMobileMenu={showMobileMenu}
          onclick={handleMobileMenu}
        />
      </div>
    </header>
  )
}