import React from "react";
import cn from 'classnames';
import { useContext } from "react";
import s from './Header.module.css';
import { CardContext } from './../../context/CardContext';
// import { ThemeContext } from "../../context/ThemeContext";
import { Link } from 'react-router-dom';
import { ReactComponent as FavIcon } from './img/fav.svg';

export function Header({children, setActiveModal}) {
  const { favorites } = useContext(CardContext);
  // const { toggleTheme } = useContext(ThemeContext);

  return (
    <header className={cn(s.header, 'cover')}>
      <div className='container'>
        <div className={s.wrapper}>
          {children}
          <div className={s.iconsMenu}>
            <Link className={s.favoritesLink} to={'/favorites'}>
              <FavIcon />
              {favorites.length !== 0 && (
                <span className={s.iconBubble}>{favorites.length}</span>
              )}
            </Link>
          </div>
            <div style={{cursor: 'pointer', border: '2px solid black', padding: '5px 10px', borderRadius: '20px'}} onClick={() => setActiveModal(true)}>Вход</div>
        </div>
      </div>
    </header>
  );
}