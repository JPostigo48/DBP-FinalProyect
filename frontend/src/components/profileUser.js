import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { Alert, Row, Col, Nav } from "reactstrap";
import { Button } from "reactstrap";
import ImgPerfil from "../img/perfil.svg";
import IcnBack from "../img/arrow.svg";
import { apigetDataFollow, apigetDataUser, apipostStatusFollow } from "../api/user";

const ProfileInfU = (props) => {
  const { Userid } = props;

  const id = JSON.parse(localStorage.getItem("jwt")).user._id;

  const [data, setData] = useState([]);
  const [datafollow, setdataFollow] = useState([]);
  const [statusfollow, setstatusFollow] = useState([]);

  const dataUser = () => {
    apigetDataUser(Userid).then((data) => {
      setData(data);
    });
  };

  const dataFollow = () => {
    apigetDataFollow(id, Userid).then((data) => {
      setdataFollow(data);
      setstatusFollow(data);
    });
  };

  const changeFollow = () => {
    // setstatusFollow(!statusfollow)
    apipostStatusFollow(id,Userid).then((data) => {
      setstatusFollow(data);
    });
    console.log(statusfollow)
  };

  useEffect(() => {
    dataUser();
    dataFollow();
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

  const buttonValue = (a) => {
    if (a) {
      return (
          "Dejar de seguir"
      );
    } else {
      return (
          "Seguir"
      );
    }
  };

  return (
    <div class="card-profile">
      <Link to="/main">
        <img className="icn" src={IcnBack} alt="icn-back" />
      </Link>
      <div>
        <img className="picture-profile" src={ImgPerfil} alt="img-portada" />
      </div>

      <div class="container-date-profile mt-3">
        <h4>
          {data.names} {data.surnames}
        </h4>
        <p>{data.status}</p>
        <p>{props.description}</p>
      </div>
      <Row>
        <Col>
          <h4>{nfollowers()} followers</h4>
        </Col>
        <Col>
          <h4>{nfollowing()} followings</h4>
        </Col>
      </Row>
      <Button onClick={changeFollow} color="info" className="edit-profile mt-2">
          {buttonValue(statusfollow)}
      </Button>
    </div>
  );
};

export default ProfileInfU;
