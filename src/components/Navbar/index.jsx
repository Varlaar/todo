import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link className="navbar__link" to="/">
        Главная
      </Link>
      <Link className="navbar__link" to="/notepad">
        Блокнот
      </Link>
      <Link className="navbar__link" to="/info">
        Информация
      </Link>
    </div>
  );
};

export default Navbar;
