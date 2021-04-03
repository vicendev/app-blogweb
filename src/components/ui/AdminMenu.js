import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { uiBlogScreenActive } from '../../actions/ui';

export const AdminMenu = () => {

  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [buttonValue, setButtonValue] = useState('Abrir');
  const [animateMenuClose, setAnimateMenuClose] = useState('animate__fadeInLeft');
  const [animateMenuOpen, setAnimateMenuOpen] = useState('animate__fadeOutLeft');

  const handleSideMenu = () => {

    if (!menuOpen){
      setAnimateMenuClose('animate__fadeOutLeft')

      setTimeout(() => {
        setButtonValue('Cerrar')
        setMenuOpen(!menuOpen)
        setAnimateMenuOpen('animate__fadeInLeft')
      }, 500);

    } else {
      setAnimateMenuOpen('animate__fadeOutLeft')


      setTimeout(() => {
        setButtonValue('Abrir')
        setAnimateMenuClose('animate__fadeInLeft')
        setMenuOpen(!menuOpen)
      }, 500)
    }
  }

  const handleActiveComponent = (active) => {
    dispatch(uiBlogScreenActive(active))
  } 

  return (
    
    (!menuOpen)
    ? 
      (
        <div className={`column adminblog__sidebar-open-button is-info is-1 mt-2 animate__animated ${animateMenuClose}`}>
          <span 
            className="button is-info"
            onClick={handleSideMenu}
          >{buttonValue}</span>
        </div>
      )
    :
    (
      <div className={`column is-two-fifths animate__animated ${animateMenuOpen}`}>
        <aside className="menu box">
          <span 
            className="button is-info"
            onClick={handleSideMenu}
          >{buttonValue}</span>
          <p className="menu-label">
            Administracion
          </p>
          <ul className="menu-list">
            <li>
              <a onClick={() => handleActiveComponent('Posts')}>Posts</a>
            </li>
            <li>
              <a onClick={() => handleActiveComponent('Tags')}>Tags</a>
            </li>
            <li>
              <a>Trabajos</a>
            </li>
          </ul>
        </aside>
      </div>
    )
  )
}
