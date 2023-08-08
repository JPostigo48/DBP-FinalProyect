import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import { Link, Navigate } from "react-router-dom";
import SearchBar from "../components/search-bar";
import ProfileInf from "../components/profile";
import Edit from "../components/edit";
import { apimodifyUser } from "../api/user";

const EditProfile = (req, res) => {
  const email = JSON.parse(localStorage.getItem('jwt')).user.email;
  const [values, setValues] = useState({
    names: "",
    surnames: "",
    password: "",
    newpassword: "",
    status: "",
    alert: "Escriba todos sus datos por favor :D",
    alertColor: "info",
    redirectToReferrer: false,
  });

  const { names, surnames, password, newpassword, status, alert, alertColor, redirectToReferrer } = values;
  
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    apimodifyUser({ names, surnames, email, password, newpassword, status }).then((data) => {
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
      return <Navigate to={`/logout/`} />;
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
              <Edit
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
              />
          </Row>
          <Link className="mb-5 d-flex justify-content-center" to="/profile/edit/city">Cambiar ciudad...</Link>
        </Col>
      </Row>
    </div>
  );
};

export default EditProfile;
