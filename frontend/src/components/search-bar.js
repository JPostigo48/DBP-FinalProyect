import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import ImgLogout from "../img/logout.svg";
import ImgPerfil from "../img/perfil.svg";
import ImgSearch from "../img/search.svg";

function SearchBar(props) {
  let {space} = props
  const [search, setSearch] = useState("");

  const handleChange = () => (event) => {
    setSearch( event.target.value );
  };

  const clickSubmit = (event) => {
    <Navigate to={`./${search}`} />
  };

  return (
    <div className={`box ${space}`}>
      <div className={`container-1`}>
        <input
          value={search}
          onChange={handleChange()}
          type="search"
          id="search"
          placeholder="Realiza tu busqueda aqui"
        />
        <Link to={`../search/${search}`} className="alert-link">
          <img className="img-search" src={ImgSearch} />
        </Link>
      </div>
      <div className="container-2">
        <Link to="/profile/" className="alert-link">
          <img className="img-perfil" src={ImgPerfil} />
        </Link>
        
        <Link to="/logout" className="alert-link">
          <img className="img-logout" src={ImgLogout} />
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
