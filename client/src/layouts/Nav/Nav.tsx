import { Link } from 'react-router-dom'
import './Nav.scss'
import Btn from '../../components/Btn/Btn';
import { useAuthContext } from '../../context/hooks/useAuthContext';

const Nav = () => {
  const { token, userId, logout } = useAuthContext();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement> ) => {
    e.preventDefault();

    if (logout) {
      logout();
    }
  };


  return (
    <nav data-js="nav">
      <div id="js-nav-mobile" className="nav-mobile">
        <ul className="nav-mobile__list nav-mobile--flex">
          { token ? (
            <>
              <li className="nav-mobile__item">
                <Link className="nav-mobile__link" to={`/dashboard/${userId}`}>Home</Link>
              </li>
              <li className="nav-mobile__item">
                <Link className="nav-mobile__link" to="/set/add">Create Set</Link>
              </li>
              <li className="nav-mobile__item">
                <Link className="nav-mobile__link" to="/profile/">Profile</Link>
              </li>
              <li className="nav-mobile__item ">
                <Link className="nav-mobile__link" to="/logout">Log Out</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-mobile__item">
                <Link className="nav-mobile__link" to="/">Home</Link>
              </li>
              <li className="nav-mobile__item">
                <Link className="nav-mobile__link" to="/register">Sign Up</Link>
              </li>
              <li className="nav-mobile__item">
                <Link className="nav-mobile__link" to="/login">Log In</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="nav-desktop">
        <ul className="nav-desktop__list nav-desktop--flex">
          { token ? (
            <>
              <li className="nav-desktop__item">
                <Link to={`/dashboard/${userId}`}>Home</Link>
              </li>
              <li className="nav-desktop__item">
                <Link to="/set/add">Create Set</Link>
              </li>
              {userId && (
                <li className="nav-desktop__item">
                  <Link to={`/profile/${userId}`}>Profile</Link>
                </li>
              )}
              <Btn
                className="btn--black p-3"
                tag="button"
                onClick={handleLogout}  
              >
                Logout
              </Btn>
            </>
          ) : (
            <>
              <li className="nav-desktop__item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-desktop__item">
                <Link className="nav__list-link" to="/register">Sign Up</Link>
              </li>
              <li className="nav-desktop__item mr-0">
                <Btn
                  to="/login"
                  className="btn--primary p-3"
                >
                  Login
                </Btn>
              </li>
            </>
          )}
        </ul>   
      </div>
    </nav>
  )
}       

export default Nav;