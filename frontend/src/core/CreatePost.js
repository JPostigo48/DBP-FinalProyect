import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Row, Col } from "reactstrap";

import NavBar from "../components/nav-bar";
import SearchBar from "../components/search-bar";
import ProfileInf from "../components/profile";
import NewPost from "../components/newpost";
import { apicreatePost, apigetPublicationsByUser } from "../api/post";

const CreatePost = (props) => {
  const names = JSON.parse(localStorage.getItem("jwt")).user.names;
  const surnames = JSON.parse(localStorage.getItem("jwt")).user.surnames;
  const author = JSON.parse(localStorage.getItem("jwt")).user._id;
  const id = JSON.parse(localStorage.getItem("jwt")).user._id;

  const [post, setPost] = useState([]);
  const [values, setValues] = useState({
    labels: "",
    title: "",
    description: "",
    file: "",
    redirectToMain: false,
    loading: false,
    success: false,
    formData: "",
    error: "",
  });


  const {
    labels,
    title,
    description,
    file,
    redirectToMain,
    loading,
    success,
    formData,
    error,
  } = values;

  const posts = () => {
    apigetPublicationsByUser(id).then((data) => {
      let a = data;
      setPost(a);
    });
  };

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    posts();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "file" ? event.target.files[0] : event.target.value;
    formData.set("author", id)
    formData.set(name, value);
    setValues({ ...values, error: false, [name]: value });
  };

  const nposts = () => {
    let n = 0;
    post.forEach((a) => {
      n = n + 1;
    });
    return n;
  };

  const redirectUser = () => {
    if (redirectToMain) {
      return <Navigate to={`/main`} />;
    }
  };

  const showError = () => {
    if (error) {
      return (
        <div
          className="alert alert-danger w"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      );
    }
  };

  const showSuccess = () => {
    if (success) {
      return (
        <div
          className="alert alert-info"
          style={{ display: title ? "" : "none" }}
        >
          {`"${title}" fue publicado`}
        </div>
      );
    }
  };

  const showLoading = () =>
    loading && <div className="alert alert-success">Cargando ...</div>;

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    apicreatePost(formData).then((data) => {
      console.log("a");
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          labels: "",
          title: "",
          description: "",
          file: "",
          loading: false,
          success: true,
          redirectToMain: true,
        });
      }
    });
  };

  return (
    <div>
      {redirectUser()}
      <Row className="all-container">
        <ProfileInf />
        <Col className="section-main">
          <Row>
            <Col>
              <SearchBar space="yes" />
            </Col>
          </Row>
          <Row className="mt-4"></Row>
          <Row className="mt-5">
            <Col className="me-2 ms-2">
              <NavBar select="P" n={nposts()} />
            </Col>
          </Row>

          <Row className="mt-4">
            <Row className="me-5 ms-5">
              {showLoading()}
              {showSuccess()}
              {showError()}
            </Row>
            <Row>
              <NewPost
                onSubmit={clickSubmit}
                onChangeLabels={handleChange("labels")}
                onChangeTitle={handleChange("title")}
                onChangeDescription={handleChange("description")}
                onChangeFile={handleChange("file")}
                author={`${names} ${surnames}`}
                labels={labels}
                title={title}
                description={description}
                file={file}
              />
            </Row>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CreatePost;
