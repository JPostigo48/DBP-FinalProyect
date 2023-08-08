const formidable = require("formidable");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const User = require("../models/user.model");
const Post = require("../models/post.model");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req)
      .then(({ fields, files }) => {
          const post = new Post(fields);

          if (files.file) {
              if (files.file.size > 1000000) {
                  throw new Error("Solo permitimos 1MB como máximo por archivo :c");
              }
              post.file.data = fs.readFileSync(files.file.path);
              post.file.contentType = files.file.type;
          }

          return post.save();
      })
      .then(result => {
          res.json(result);
      })
      .catch(err => {
          console.log(err);
          let errorMessage = err.message || "Ocurrió un error al crear la publicación";
          res.status(400).json({
              error: errorMessage
          });
      });
};

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "created";

  Post.find()
      .populate("author")
      .sort([[sortBy, order]])
      .exec()
      .then(posts => {
          res.json(posts);
      })
      .catch(err => {
          res.status(400).json({
              error: "Posts no encontrados"
          });
      });
};

exports.search = (req, res) => {
  const tag = req.body[0];

  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "created";

  Post.find({ title: { $regex: tag } })
      .populate("author")
      .sort([[sortBy, order]])
      .exec()
      .then(posts => {
          res.json(posts);
      })
      .catch(err => {
          res.status(400).json({
              error: "Posts no encontrados"
          });
      });
};

exports.postsByUser = (req, res) => {
  const { _id } = req.User;
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";

  Post.find({ author: _id })
      .populate("author")
      .sort([[sortBy, order]])
      .exec()
      .then(posts => {
          res.json(posts);
      })
      .catch(err => {
          res.status(400).json({
              error: "Posts no encontrados"
          });
      });
};

exports.likeModify = (req, res) => {
  const { id, Postid } = req.body;

  Post.findById(Postid)
      .exec()
      .then(P => {
          if (!P) {
              throw new Error(`El post no fue encontrado o no existe`);
          }
          if (P.likes.includes(id)) {
              P.likes.splice(P.likes.indexOf(id), 1);
          } else {
              P.likes.push(id);
          }
          return P.save();
      })
      .then(P => {
          res.json(P.likes.includes(id));
      })
      .catch(err => {
          res.status(400).json({
              message: err.message
          });
      });
};

exports.likes = (req, res) => {
  const { Postid } = req.body;

  Post.findById(Postid)
      .exec()
      .then(P => {
          if (!P) {
              throw new Error(`El post no fue encontrado o no existe`);
          }
          res.json(P.likes);
      })
      .catch(err => {
          res.status(400).json({
              message: err.message
          });
      });
};

exports.PostById = (req, res, next, id) => {
  Post.findById(id)
      .exec()
      .then(Post => {
          if (!Post) {
              throw new Error("El post no fue encontrado o no existe");
          }
          req.Post = Post;
          next();
      })
      .catch(err => {
          res.status(400).json({
              error: err.message
          });
      });
};
