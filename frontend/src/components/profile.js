import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import ImgPerfil from "../img/perfil.svg";
import IcnBack from "../img/arrow.svg";
import { apigetDataUser } from "../api/user";

const ProfileInf = (props) => {
  const id = JSON.parse(localStorage.getItem("jwt")).user._id;

  const [data, setData] = useState([]);

  const dataUser = () => {
    apigetDataUser(id).then((data) => {
      setData(data);
    });

  };

  useEffect(() => {
    dataUser();
  }, []);

  const nfollowers = () => {
    let c = 0;
    for (let o in data.followers) {
      c++;
    }
    return c;
  };

  const nfollowing = () => {
    let c = 0;
    for (let o in data.following) {
      c++;
    }
    return c;
  };

  return (
    <div className="card-profile">
      <Link to="/main">
        <img className="icn" src={IcnBack} alt="icn-back" />
      </Link>
      <div>
        <img className="picture-profile" src={ImgPerfil} alt="img-portada" />
      </div>

      <div className="container-date-profile mt-3">
        <h4>
          {data.names} {data.surnames}
        </h4>
        <p>{data.city}</p>
        <p>{data.status}</p>
      </div>
      <Row>
        <Col>
          <h4>{nfollowers()} followers</h4>
        </Col>
        <Col>
          <h4>{nfollowing()} followings</h4>
        </Col>
      </Row>
      <Link to="/profile/edit" className="alert-link">
        <Button color="info" className="edit-profile mt-2">
          Editar Perfil
        </Button>
      </Link>
    </div>
  );
};
export default ProfileInf;
