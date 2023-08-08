import React from "react";
import { Col, Nav, Navbar, NavItem, NavbarBrand, NavLink } from "reactstrap";


import "./components.css"

class Header extends React.Component {
  render() {
    return (
      <div>
        <Navbar className="mt-2" color="light" light expand="md">
          <Col className="float-left ms-5">
          <NavbarBrand href="/">Red Social</NavbarBrand>
          </Col>
          <Col className="float-right ms-10">
            <Nav navbar>
            <NavItem>
                <NavLink href="">Descripción</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">
                  Contacto
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/signin">
                  Iniciar Sesión
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Navbar>
      </div>
    );
  }
}

export default Header;