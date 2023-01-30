import React, { useContext } from "react";
import s from './Header.module.css';
import cn from 'classnames';
import { ReactComponent as FavIcon } from './img/fav.svg';


import { CardContext } from './../../context/CardContext';
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from 'react-router-dom';

export function Header({children}) {
  const { favorites } = useContext(CardContext);
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <header className={cn(s.header, 'cover')}>
      <div className="container">
        <div className={s.wrapper}>
          {children}
          <div className={s.iconsMenu}>
            <Link className={s.favoritesLink} to={'/favorites'}>
              <FavIcon />
              {/* {favorites.length !== 0 && (
                <span className={s.iconBubble}>{favorites.length}</span>
              )} */}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}