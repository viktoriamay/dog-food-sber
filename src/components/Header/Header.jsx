import React from 'react';
import cn from 'classnames';
import { useContext } from 'react';
import s from './Header.module.scss';
import { CardContext } from './../../context/CardContext';
// import { ThemeContext } from "../../context/ThemeContext";
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as FavIcon } from './img/fav.svg';
import { ReactComponent as ProfileIcon } from './img/profile.svg';
import { ReactComponent as ChartsIcon } from './img/charts.svg';
import { ReactComponent as LogIcon } from './img/log.svg';
import { UserContext } from './../../context/UserContext';

export function Header(props) {
  const { favorites } = useContext(CardContext);
  const location = useLocation();
  // const { toggleTheme } = useContext(ThemeContext);
  // console.log(props); для понимания что приходит в пропсы

  const { isAuthentificated, setActiveModal } = useContext(UserContext);

  return (
    <header className={cn(s.header, 'cover')}>
      <div className="container">
        <div className={s.wrapper}>
          {props.children}

          <div className={s.iconsMenu}>
            <div className={s.icons__like}>
              <Link className={s.favoritesLink} to={'/favorites'}>
                <FavIcon />
                {favorites.length !== 0 && (
                  <span className={s.iconBubble}>{favorites.length}</span>
                )}
              </Link>
            </div>
            {/* {!props.isAuthentificated &&  скрывать эту кнопку при условии что мы вошли в аккаунт */}
            {isAuthentificated ? (
              <Link to={'/profile'}>
                <ProfileIcon />
              </Link>
            ) : (
              <Link
                to={'/login'}
                onClick={() => setActiveModal(true)}
                state={{
                  backgroundLocation: location,
                  initialPath: location.pathname,
                }}>
                <LogIcon />
              </Link>
            )}
            <Link to={'/chart'}>
              <ChartsIcon />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
