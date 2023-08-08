import React, { useEffect, useState } from "react";
import { Row, Col, Alert, Button } from "reactstrap";
import { Link, Navigate } from "react-router-dom";
import SearchBar from "../components/search-bar";
import ProfileInf from "../components/profile";
import axios from 'axios';
import { apiaddCity, apigetDataCities, apimodifyUser } from "../api/user";

const AddCity = () => {
  const id = JSON.parse(localStorage.getItem("jwt")).user._id;
  const email = JSON.parse(localStorage.getItem('jwt')).user.email;
  const [values, setValues] = useState({
    password: "",
    city: "Arequipa",
    alert: "Escriba todos sus datos por favor :D",
    alertColor: "info",
    redirectToReferrer: false,
  });
  const [cities, setCities] = useState([])

  useEffect(() => {
    const soapEnvelope = `
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
  <s:Header>
    <Action s:mustUnderstand="1" xmlns="http://schemas.microsoft.com/ws/2005/05/addressing/none">http://tempuri.org/IService1/getCiudades</Action>
  </s:Header>
  <s:Body>
    <getCiudades xmlns="http://tempuri.org/" />
  </s:Body>
</s:Envelope>
`;

const headers = {
  "Content-Type": "text/xml;charset=UTF-8",
  "SOAPAction": "http://tempuri.org/IService1/getCiudades",
};

axios.post("https://localhost:44364/Service1.svc", soapEnvelope, { headers })
  .then(response => {
    console.log(response.data);
    setCities(response.data)
  })
  .catch(error => {
    console.error(error);
    // Manejar el error si ocurre
  });
  }, []);

  const { password, city, alert, alertColor, redirectToReferrer } = values;
  
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    apiaddCity({ email, password, city }).then((data) => {
      if (data.error) {
        setValues({ ...values, alertColor:"danger",alert: data.error });
      } else {
        setValues({
          ...values,
          redirectToReferrer: true,
        });
      }
    })
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Navigate to={`/profile/`} />;
    }
  };

  return (
    <div className="scroll">
      {redirectUser()}
      <Row>
        <ProfileInf />
        <Col className="section-main">
          <Row>
            <Col>
              <SearchBar
                space="yes"
              />
            </Col>
          </Row>
          <Row className="mt-5"></Row>
          <Row className="mt-5 ms-4 me-3">
              {/* <Edit
                onClick={clickSubmit}
                onChangeNames={handleChange("names")}
                onChangeSurnames={handleChange("surnames")}
                onChangePassword={handleChange("password")}
                onChangeNewPassword={handleChange("newpassword")}
                onChangeStatus={handleChange("status")}
                names={names}
                surnames={surnames}
                password={password}
                newpassword={newpassword}
                status={status}
                alert={alert}
                alertColor={alertColor}
              /> */}
              <Row>
                <Alert color={`${alertColor} text-center alert-edit`}>
                  {alert}
                </Alert>
                <Col className="form-edit ms-4 me-3">
                  <form>
                    <div className="mb-3">
                      <label for="contrasena" className="etiqueta-edit">
                        Contraseña Actual
                      </label>
                      <input
                        onChange={handleChange("password")}
                        value={password}
                        type="password"
                        className="input_caja mt-1"
                        id="contrasena"
                        placeholder="●●●●●●●●●●"
                      />
                    </div>
                  </form>
                </Col>
                <Row>
                  <Row className="mb-3 mt-2">
                    <Col className="ms-5">
                      <Link to="/profile/" className="alert-link">
                        <Button  type="submit" 
                          onClick={clickSubmit} color="info" className="edit-profile center">
                          Editar
                        </Button>
                      </Link>
                    </Col>
                    <Col className="me-5">
                      <Link to="/profile/" className="alert-link">
                        <Button color="info" className="edit-profile center">
                          Cancelar
                        </Button>{" "}
                      </Link>
                    </Col>
                  </Row>
                </Row>
              </Row>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AddCity;
