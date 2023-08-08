import React from "react";
import { Col, Row } from "reactstrap";
import portada from "../img/portada.svg";

class Register extends React.Component {
  render() {
    return (
      <div className="contenedor">
        <Row className="ms-5">
          <Col>
            <form>
              <a href="/">
                <h4>RED SOCIAL</h4>
              </a>
              <p className="titulo">INGRESA TUS DATOS</p>
              <div>
                Ya tengo una cuenta,
                <a href="/signin">Iniciar Sesión</a>
              </div>
              <div>
                <label for="nombre" className="etiqueta">
                  Nombres
                </label>
                <input
                  onChange={this.props.onChangeNames}
                  value={this.props.names}
                  type="text"
                  className="input_caja"
                  id="nombre"
                  required
                  placeholder="Ingresa aquí tus nombres"
                />
              </div>
              <div>
                <label for="apellidos" className="etiqueta">
                  Apellidos
                </label>
                <input
                  type="text"
                  className="input_caja"
                  id="apellidos"
                  required
                  placeholder="Ingresa aquí tus apellidos"
                  onChange={this.props.onChangeSurnames}
                  value={this.props.surnames}
                />
              </div>
              <div>
                <label for="email" className="etiqueta">
                  Correo
                </label>
                <input
                  type="text"
                  className="input_caja"
                  id="correo"
                  required
                  placeholder="usuario@unsa.edu.pe"
                  onChange={this.props.onChangeEmail}
                  value={this.props.email}
                />
              </div>
              <div>
                <label for="contrasena" className="etiqueta">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="input_caja"
                  id="contrasena"
                  required
                  placeholder="●●●●●●●●●●"
                  onChange={this.props.onChangePassword}
                  value={this.props.password}
                />
              </div>
              <button
                className="boton"
                type="submit"
                onClick={this.props.onClick}
              >
                Registrarse
              </button>
            </form>
          </Col>
          <Col className="ms-5">
            <img className="imagen" src={portada} alt="img-portada" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Register;
