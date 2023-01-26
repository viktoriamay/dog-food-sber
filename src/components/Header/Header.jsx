import React from "react";
import './Header.css';

export function Header({children, user, onUpdateUser}) {
  const handleClickButtonEdit = (e) => {
    e.preventDefault();
    onUpdateUser({about: "Писатель"})
  };

  return (
    <header className="header cover">
      <div className="container">
        {/* {user && <span>{user.email}</span>}
        {user && <span>{user.name}</span>} */}

        <span>{user?.email}</span>
        <span>{user?.name}</span>
        <button className="btn" onClick={handleClickButtonEdit}>Change</button>
        <div className="header__wrapper">
          {children}
        </div>
      </div>
    </header>
  );
}