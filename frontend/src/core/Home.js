import React from "react";
import { Col, Row } from "reactstrap";
import Contact from "../components/contact";
import Header from "../components/header";


import home from "../img/home.svg";

import "./core.css"

const Home = (req, res) => {
  return (
    <div>
      <Header />
      <Row className="section-start">
        <Col className="ms-5 mt-5">
          <img className="imagen" src={home} alt="img-portada" />
        </Col>
        <Col className="mt-35">
          <h1 className="title1">Red Social</h1>
          <h1 className="title2">UNSA</h1>
        </Col>
      </Row>

      <Row>
        <Col className="mt-5 section-description">
          <h1 className="section-title">Descripción</h1>
          <p className="parraf">
            Nuestro proyecto final es una Red Social que fue diseñada con el
            objetivo de consolidar los conceptos reacionados con el curso
            Desarrollo Basado En Plataformas. Somos un grupo conformado por
            cinco estudiantes de la carrera Ciencia de la Computación. La Red
            Social fue creada con el objetivo de facilitar la publicación de
            articulos relacionados con nuestra carrera, con el fin de promover
            la investigación y servir como red de información privada para los
            alumnos de Ciencia de la Computación.{" "}
          </p>

          <p className="parraf">
            La Red Social fue creada con el objetivo de facilitar los articulos
            relacionados con nuestra carrera, con el fin de promover la
            investigación y tener un lugar donde poder encontrar información
            referenciable en proyectos de investigación.{" "}
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <h1 className="section-title">Contacto</h1>
        <Col className="">
          <Contact img={home} name="Juan Carlos Postigo" area="Suport" />
        </Col>
        <Col className="">
          <Contact img={home} name="Aquino Mamani Ana Karina" area="Suport" />
        </Col>
        <Col className="">
          <Contact img={home} name="Soto Huerta Angela Shirleth" area="Suport" />
        </Col>
        <Col className="">
          <Contact img={home} name="Colque Noa Valery Andrea" area="Suport" />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
