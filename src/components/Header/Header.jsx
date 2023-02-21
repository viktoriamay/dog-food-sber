import React from "react";
import cn from 'classnames';
import { useContext } from "react";
import s from './Header.module.css';
import { CardContext } from './../../context/CardContext';
// import { ThemeContext } from "../../context/ThemeContext";
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as FavIcon } from './img/fav.svg';

export function Header(props) {
  const { favorites } = useContext(CardContext);
  const location = useLocation();
  // const { toggleTheme } = useContext(ThemeContext);
  // console.log(props); для понимания что приходит в пропсы
  return (
    <header className={cn(s.header, 'cover')}>
      <div className='container'>
        <div className={s.wrapper}>
          {props.children}
          <div className={s.iconsMenu}>
            <Link className={s.favoritesLink} to={'/favorites'}>
              <FavIcon />
              {favorites.length !== 0 && (
                <span className={s.iconBubble}>{favorites.length}</span>
              )}
            </Link>
          </div>
            <Link className={s.login__btn} to={'/login'} onClick={() => props.setActiveModal(true)} state = {{backgroundLocation: location, initialPath: location.pathname}}>
              Вход
            </Link>
        </div>
      </div>
    </header>
  );
}