import React from "react";
import Navbar from "../Navbar";
import Clock from "../Clock";

import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header__section">
        <div className="header__item headerlogo">TODO</div>
        <div className="header__item">
          <Navbar />
        </div>
      </div>
      <div className="header__section">
        <div className="header__item">
          <Clock />
        </div>
      </div>
    </div>
  );
};

export default Header;
