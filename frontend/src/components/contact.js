import React from "react";

import "./components.css"

import mail from "../img/mail.svg";
import fb from "../img/fb.svg";
import github from "../img/github.svg";

const Contact = (props) => {
  return (
    <div className="card mb-5">
      <div>
        <img className="picture" src={props.img} alt="img-portada" />
      </div>

      <div className="container-date">
        <h4>
          <b>{props.name}</b>
        </h4>
        <p>{props.area}</p>
        <p>{props.description}</p>
      </div>
      
      <div className="container-aux">
        <img className="aux" src={mail} alt="Mail" />
        <img className="aux" src={fb} alt="fb" />
        <img className="aux" src={github} alt="github" />
      </div>
    </div>
  );
};

export default Contact;