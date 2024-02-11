import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink} from 'react-router-dom'
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

  const dispatch = useDispatch();
  const { uid } = useSelector(state => state.auth)

  const toggleBurger = () => {
    document.querySelector('.navbar-menu').classList.toggle('is-active');
  }

  const handleLogout = () => {
    dispatch(startLogout())
  }

  return (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link 
        className="navbar-item" href="https://bulma.io"
        to="/"
      >
        <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
      </Link>

      <a role="button" id="nav-menu" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
        onClick={toggleBurger}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <NavLink 
          activeClassName="has-text-primary has-background-primary-light"
          className="navbar-item"
          to="/blog"
        >
          Blog
        </NavLink>

        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">
            Más
          </a>

          <div className="navbar-dropdown animate__animated animate__flipInX animate__faster">
            <NavLink className="navbar-item" to="/admin">
              Admin Dashboard
            </NavLink>
            <a className="navbar-item">
              Contacto
            </a>
            <hr className="navbar-divider" />
            <a className="navbar-item">
              Redes sociales
            </a>
          </div>
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {
              (!uid)
              ?
              <NavLink
                className="button is-link is-light"
                to="/auth/login"
              >
                Log in
              </NavLink>  
              :
              <a
                className="button is-warning is-light"
                onClick={handleLogout}
              >
                Log out
              </a>
            }

          </div>
        </div>
      </div>
    </div>
  </nav>
  )
}
