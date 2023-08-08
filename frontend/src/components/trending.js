import React from "react";
import { Row, Col } from "reactstrap";

import ImgPerfil from "../img/perfil.svg";

const Person = (props) => {
  return (
    <div>
      <div className="person-card-container">
        <Row>
          <Col xs="auto">
            <img class="person-card-img" src={ImgPerfil} />
          </Col>
          <Col className="person-card-body">
            <a class="person-card-name" href="">
              {props.name}
            </a>
            <br></br>
            <button class="person-card-follow" href="">
              Follow
            </button>
          </Col>
        </Row>
      </div>
      <hr></hr>
    </div>
  );
};

const Topic = (props) => {
  return (
    <div>
      <div className="person-card-container">
        <Row>
          <a class="person-card-name" href="">
            {props.name}
          </a>
          <br></br>
          <span class="person-card-description" href="">
            {props.cant} Publicaciones Relacionadas
          </span>
        </Row>
      </div>
      <hr></hr>
    </div>
  );
};

const Trending = (props) => {
  return (
    <div className="container-all">
      <div className="trending-card-container">
        <div className="trending-card-head">
          <h1 className="trending-card-title">Investigadores en Tendencia</h1>
        </div>
        <hr></hr>
        <div>
          <Person name="Juan Soto" />
          <Person name="Juan Postigo" />
          <Person name="Alejandro Villa" />
          <Person name="Samuel Chambi" />
          <a class="person-card-more" href="">
            Ver más...
          </a>
        </div>
      </div>
      <br></br>

      <div className="trending-card-container">
        <div className="trending-card-head">
          <h1 className="trending-card-title">Tópicos en Tendencia</h1>
        </div>
        <hr></hr>
        <div>
          <Topic name="Inteligencia Artificial" cant="2" />
          <Topic name="Estructura de Datos" cant="1" />
          <Topic name="Prog. de Alto Desempeño" cant="1" />
          <a class="person-card-more" href="">
            Ver más...
          </a>
        </div>
      </div>
    </div>
  );
};

export default Trending;
