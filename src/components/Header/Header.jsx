import React from "react";
import './Header.css'
import Logo from '../Logo/Logo'
import Search from "../Search/Search";

export function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <Search />
        </div>
      </div>
    </header>
  );
}