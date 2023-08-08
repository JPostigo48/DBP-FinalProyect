import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const { n, select } = props;
  const a = () => {
    if (select === "P") {
      return (
        <nav className="nav-2">
          <Link className="nav-2-select" to="/profile">
            {n} Publicaciones
          </Link>
          <Link to="/profile/A">0 Articulos</Link>
          <Link to="/profile/F">0 Favoritos</Link>
        </nav>
      );
    } else if (select === "A") {
      return (
        <nav className="nav-2">
          <Link to="/profile">
            {n} Publicaciones
          </Link>
          <Link className="nav-2-select" to="">0 Articulos</Link>
          <Link to="/profile/F">0 Favoritos</Link>
        </nav>
      );
    } else if (select === "F") {
      return (
        <nav className="nav-2">
          <Link to="/profile">
            {n} Publicaciones
          </Link>
          <Link to="/profile/A">0 Articulos</Link>
          <Link className="nav-2-select" to="">0 Favoritos</Link>
        </nav>
      );
    } else if (select === "U"){
      return (
        <nav className="nav-2">
          <Link to="http://localhost:3000/profile/">
            {n} Publicaciones
          </Link>
        </nav>
      );
    }
  };

  return <div className="box-nav-bar">{a()}</div>;
};

export default NavBar;
