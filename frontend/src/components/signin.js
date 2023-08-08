import React from "react";
import { Col, Container, Row } from "reactstrap";
import portada from "../img/portada.svg";

class Login extends React.Component {
  render() {
    return (
      <Container className="contenedor mt-5">
        <Row>
          <Col className="mt-4 ms-5 d-inline-flex p-2 bd-highlight">
              <form>
                <a href="/"><h2>RED SOCIAL</h2></a>
                <p className="titulo">BIENVENIDO DE NUEVO</p>
                <div>
                  No tengo una cuenta,
                  <a href="/signup">Registrarme</a>
                </div>
                <div className="mt-3">
                  <label for="email" className="etiqueta">
                    Usuario
                  </label>
                  <input
                    onChange={this.props.onChangeEmail}
                    className="input_caja mt-1"
                    id="correo"
                    required
                    placeholder="usuario@unsa.edu.pe"
                    type="email"
                    value={this.props.email}
                  />
                </div>
                <div className="mt-3">
                  <label for="contrasena" className="etiqueta">
                    Contraseña
                  </label>
                  <input
                    onChange={this.props.onChangePassword}
                    value={this.props.password}
                    type="password"
                    className="input_caja mt-1"
                    id="contrasena"
                    required
                    placeholder="●●●●●●●●●●"
                  />
                </div>
                <div className="mt-4">
                  <button
                    onClick={this.props.onClick}
                    type="submit"
                    className="boton"
                  >
                    Iniciar
                  </button>
                </div>
              </form>
          </Col>
          <Col className="ms-5">
            <img className="imagen" src={portada} alt="img-portada" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
