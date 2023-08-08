import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button } from "reactstrap";
import NavBar from "../components/nav-bar";
import SearchBar from "../components/search-bar";
import ProfileInf from "../components/profile";
import Post from "../components/post";
import { apigetPublicationsByUser } from "../api/post";
import { Link } from "react-router-dom";

const Profile = (props) => {

  const id = JSON.parse(localStorage.getItem('jwt')).user._id;

  const [post, setPost] = useState([]);

  const posts = () => {
    apigetPublicationsByUser(id).then((data) => {
      let a = data;
      setPost(a);
    });
  };

  useEffect(() => {
    posts();
  }, []);

  const cards = () => {
    let postcards;
    postcards = [];
    post.forEach((a) => {
      console.log(a);
      let e = `${a.author.names} ${a.author.surnames}`;
      let i = "";
      a.labels.forEach((u) => {
        i = `${i} ${u}`;
      });
      let ok = 0;
      a.likes.forEach((oki) => {
        ok = ok + 1;
      });
      let o = (
        <Post
          id={a.author._id}
          idPost={a._id}
          title={a.title}
          description={a.description}
          author={e}
          tags={i}
          userok={ok}
        />
      );
      console.log(o);
      postcards.push(o);
    });
    console.log(postcards);
    return postcards;
  };

  const nposts = () => {
    let n = 0;
    post.forEach((a) => {
      n = n + 1;
    });
    return n;
  };

  return (
    <div>
      <Row className="all-container">
        <ProfileInf />
        <Col className="section-main">
          <Row>
              <SearchBar
                space="yes"
              />
          </Row>
          <Row className="mt-4"></Row>
          <Col className="section-main">
          <Row className="mt-5">
            <Col className="me-2 ms-2">
              <NavBar
                select="P"
                n={nposts()}
              />
            </Col>
          </Row>
          <Row>
            <Link to="/profile/newpost">
              <Button className="margin-sides-20px center button-newpost mt-2 mb-2">Crear nueva publicación</Button>
            </Link>
            {cards()}
          </Row>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
