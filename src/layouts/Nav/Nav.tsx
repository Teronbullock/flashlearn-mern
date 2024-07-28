import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './Nav.scss';
import Btn from '../../components/Btn/Btn';
import { useAuthContext } from '../../context/hooks/useAuthContext';

type NavProps = {
  showMobileMenu: string;
  onclick: () => void;
};

const Nav = ({ showMobileMenu, onclick }: NavProps) => {
  const { token, userId, logout } = useAuthContext();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (logout) {
      logout();
      onclick();
    }
  };

  return (
    <nav
      id='nav'
      {...(showMobileMenu && { className: classNames(showMobileMenu) })}
    >
      <div id='js-nav-mobile' className='nav-mobile'>
        <ul className='nav-mobile__list nav-mobile--flex'>
          {token ? (
            <>
              <li className='nav-mobile__item'>
                <Link
                  className='nav-mobile__link'
                  to={`/dashboard/${userId}`}
                  onClick={onclick}
                >
                  Home
                </Link>
              </li>
              <li className='nav-mobile__item'>
                <Link
                  className='nav-mobile__link'
                  to={`/set/user/${userId}/add`}
                  onClick={onclick}
                >
                  Create Set
                </Link>
              </li>
              {userId && (
                <li className='nav-mobile__item'>
                  <Btn
                    to={`/profile/${userId}`}
                    className='nav-mobile__link'
                    defaultStyle={false}
                    onClick={onclick}
                  >
                    Profile
                  </Btn>
                </li>
              )}
              <li className='nav-mobile__item'>
                <Btn
                  className='nav-mobile__link'
                  to='/'
                  onClick={handleLogout}
                  defaultStyle={false}
                >
                  Logout
                </Btn>
              </li>
            </>
          ) : (
            <>
              <li className='nav-mobile__item'>
                <Link className='nav-mobile__link' to='/' onClick={onclick}>
                  Home
                </Link>
              </li>
              <li className='nav-mobile__item'>
                <Link
                  className='nav-mobile__link'
                  to='/register'
                  onClick={onclick}
                >
                  Sign Up
                </Link>
              </li>
              <li className='nav-mobile__item'>
                <Btn
                  to='/login'
                  className='nav-mobile__link border-2 border-black rounded-[15px] p-1 mx-2 mt-2'
                  onClick={onclick}
                  defaultStyle={false}
                >
                  Login
                </Btn>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className='nav-desktop'>
        <ul className='nav-desktop__list nav-desktop--flex'>
          {token ? (
            <>
              <li className='nav-desktop__item'>
                <Link to={`/dashboard/${userId}`}>Home</Link>
              </li>
              <li className='nav-desktop__item'>
                <Link to='/set/add'>Create Set</Link>
              </li>
              {userId && (
                <li className='nav-desktop__item'>
                  <Link to={`/profile/${userId}`}>Profile</Link>
                </li>
              )}
              <Btn
                className='btn--black p-3'
                tag='button'
                onClick={handleLogout}
              >
                Logout
              </Btn>
            </>
          ) : (
            <>
              <li className='nav-desktop__item'>
                <Link to='/'>Home</Link>
              </li>
              <li className='nav-desktop__item'>
                <Link className='nav__list-link' to='/register'>
                  Sign Up
                </Link>
              </li>
              <li className='nav-desktop__item mr-0'>
                <Btn to='/login' className='btn--primary p-3'>
                  Login
                </Btn>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
