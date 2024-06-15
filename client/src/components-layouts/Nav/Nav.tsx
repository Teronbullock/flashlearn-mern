import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './Nav.scss'
import Btn from '../../components/Btn/Btn';
import { AuthContext } from '../../context/AuthContext';

const Nav = () => {
  const { token, userId, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e: Event) => {
    e.preventDefault();
    console.log('logout', e);
    if (logout) {
      logout();
    }
    navigate('/');
  };

  let currentUser = null;


  if (userId !== null) {
    currentUser = userId;
    // let userId = false
  }



  return (
    <nav data-js="nav">
      <div id="js-nav-mobile" className="nav-mobile">
        <ul className="nav-mobile__list nav-mobile--flex">
          { token ? (
            <>
              <li className="nav-mobile__item">
                <Link className="nav-mobile__link" to="/dashboard">Home</Link>
              </li>
              <li className="nav-mobile__item">
                <Link className="nav-mobile__link" to="/set/create">Create Set</Link>
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
                <Link to="/dashboard">Home</Link>
              </li>
              <li className="nav-desktop__item">
                <Link to="/set/create">Create Set</Link>
              </li>
              {userId && (
                <li className="nav-desktop__item">
                  <Link to={`/profile/${userId}`}>Profile</Link>
                </li>
              )}
              <Btn
                // to="/logout"
                onClick={handleLogout}
                className="btn--black p-3"
                elementType='btn'
              >Logout</Btn>
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
                >Login</Btn>
              </li>
            </>
          )}
        </ul>   
      </div>
    </nav>
  )
}       

export default Nav;