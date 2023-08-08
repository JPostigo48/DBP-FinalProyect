import React, { useState }  from "react";
import { Alert, Row, Col } from 'reactstrap';
import { Navigate } from 'react-router-dom';

import Login from "../components/signin";

import { authenticate, isAuthenticated } from "../functions/auth.function";
import { signin } from "../api/user";

const SignIn = (req, res) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false
  });

  const {email, password, loading, error, redirectToReferrer} = values;
  const {user} = isAuthenticated();
  
  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value})
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true})
    signin({email, password})
      .then(data => {
        if (data.error) {
          setValues({...values, error: data.error, loading:false})
        } else {
          authenticate(
            data, () => {
              setValues({
                ...values,
                redirectToReferrer: true
              })
            }
          )
        }
      })
  }

  const redirectUser = () => {
    if(redirectToReferrer) {
      if (user) {
        return <Navigate to={`/main/`} />
      }
    }
    if(isAuthenticated()) {
      return <Navigate to={`/main/`} />
    }
  }

  const showError = () => (
    error && (<div className="mt-4 text-center">
      <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Alert color="danger">
              {error}
            </Alert>
          </Col>
      </Row>
    </div>)
  )

  const showLoading = () => (
    loading && (
      <div className="alert alert-info text-center">
        <h2>Cargando...</h2>
      </div>
    )
  )

  return (
    <div>
      <div className = "body">
        {redirectUser()}
        <Login
          onClick={clickSubmit}
          onChangeEmail={handleChange('email')}
          onChangePassword={handleChange('password')}
          email={email}
          password={password}
        />
        {showError()}
        {showLoading()}
        {redirectUser()}
      </div>
    </div>
  );
};

export default SignIn;