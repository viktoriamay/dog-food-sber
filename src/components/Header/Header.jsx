import React from "react";
import './Header.css'
import Logo from '../Logo/Logo'
import Search from "../Search/Search";

export function Header({children}) {
  return (
    <header className="header cover">
      <div className="container">
        <div className="header__wrapper">
          {children}
        </div>
      </div>
    </header>
  );
}