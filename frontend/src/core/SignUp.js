import React, { useState } from "react";
import Register from "../components/signup";
import { Navigate } from "react-router-dom";
import { authenticate, isAuthenticated } from "../functions/auth.function";
import { signin, signup } from "../api/user";

const SignUp = () => {
  const [values, setValues] = useState({
    names: "",
    surnames: "",
    email: "",
    password: "",
    redirectToReferrer: false,
  });

  const { names, surnames, email, password, redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    console.log(1)
    signup({ names, surnames, email, password }).then((data) => {
      console.log(2)
      if (data.error) {
        console.log(3, data.error)
        setValues({ ...values, error: data.error });
      } else {
        signin({ email, password }).then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
          } else {
            authenticate(data, () => {
              setValues({
                ...values,
                redirectToReferrer: true,
              });
            });
          }
        });
      }
    });
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Navigate to={`/main/`} />;
    }
    if (isAuthenticated()) {
      return <Navigate to={`/main/`} />;
    }
  };

  return (
    <div>
      <div className="body">
        {redirectUser()}
        <Register
          onClick={clickSubmit}
          onChangeEmail={handleChange("email")}
          onChangePassword={handleChange("password")}
          onChangeNames={handleChange("names")}
          onChangeSurnames={handleChange("surnames")}
          email={email}
          password={password}
          names={names}
          surnames={surnames}
        />
      </div>
    </div>
  );
};

export default SignUp;
