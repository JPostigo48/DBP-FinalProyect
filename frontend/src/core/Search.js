import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Alert, Row, Col } from "reactstrap";
import SearchBar from "../components/search-bar";
import Post from "../components/post";
import Trending from "../components/trending";
import { apigetPostSearched } from "../api/post";

function Search() {
  let { word } = useParams();
  const [post, setPost] = useState([]);

  const posts = () => {
    apigetPostSearched({0:word}).then((data) => {
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
        <Col>
          <Row>
            
              <SearchBar/>
            
          </Row>
        </Col>
        <Row className="ms-5 mt-5">
          <Col className="mt-5 ms-5">
          <Alert color={`info text-center alert-edit`}>
          {`Resultados de la busqueda: (${nposts()})"${word}"`}
        </Alert>
            {cards()}
          </Col>
          <Col className="mt-1">
            <Trending/>
          </Col>
        </Row>
        </Row>
    </div>
  );
};

export default Search;
