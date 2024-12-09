import { Link } from 'react-router-dom';
import './Header.scss';
import Nav from '../Nav/Nav'; 
import MobileMenuBtn from '../../components/MobileMenuBtn/MobileMenuBtn';
import { useAuthContext } from '../../context/hooks/useAuthContext';

export default function Header() {
  const { token, userId } = useAuthContext();

  return (
    <header className='header fixed top-0 left-0 w-full z-[500] h-[70px] bg-white'>
      <div className='header__container container mx-auto h-full flex justify-center items-center relative md:justify-between'>
        <h1 className='header__site-title m-0 md:w-[180px]'>
          { token ? (
            <Link className='header_site-title-link text-dark-shade' to={`/dashboard/${userId}`}>FlashCard</Link>
          ) : (
            <Link className='header_site-title-link text-dark-shade' to='/home'>FlashCard</Link>
          )}
        </h1>
        <MobileMenuBtn />
        <Nav />
      </div>
    </header>
  )
}