import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Row, Col } from "reactstrap";
import NavBar from "../components/nav-bar";
import SearchBar from "../components/search-bar";
import Post from "../components/post";
import ProfileInfU from "../components/profileUser";
import { apigetPublicationsByUser } from "../api/post";

const User = () => {
  
  let { Userid } = useParams();
  const id = JSON.parse(localStorage.getItem('jwt')).user._id;

  const [post, setPost] = useState([]);

  const posts = () => {
    apigetPublicationsByUser(Userid).then((data) => {
      let a = data;
      setPost(a);
    });
  };

  useEffect(() => {
    posts();
  }, []);

  const verify = () => {
    console.log(id, " ", Userid, " ",id === Userid)
    if (id === Userid) {
      return (
        <Navigate to={`/profile/`} />
      )
    }
  }

  const cards = () => {
    let postcards;
    postcards = [];
    post.forEach((a) => {
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
      postcards.push(o);
    });
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
      {verify}
      <Row className="all-container">
        <ProfileInfU
          Userid={Userid}
        />
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
                select="U"
                n={nposts()}
              />
            </Col>
          </Row>
          <Row>
            {cards()}
          </Row>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default User;
