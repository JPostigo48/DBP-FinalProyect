const jwt = require("jsonwebtoken");
const fs = require("fs");

const multer = require('multer');
const upload = multer().single('file');

const User = require("../models/user.model");
const Post = require("../models/post.model");
  
exports.create = (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          error: "Error al cargar el archivo",
        });
      }
  
      const { author, labels, title, description } = req.body;
      console.log(req.file); // Aquí deberías ver el objeto del archivo cargado
  
      const post = new Post({
        author,
        labels: labels.split(" "),
        title,
        description,
        file: {
            data: req.file.buffer, // Acceder al buffer del archivo cargado
            contentType: req.file.mimetype, // Obtener el tipo de contenido del archivo
          },
      });
  
      post.save().then((result) => {
        return res.json({ message: "Publicación realizada con éxito" });
      }).catch((err) => {
        console.log(err)
        return res.status(400).json({
          error: err,
        });
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

exports.likeCheck = (req, res) => {
    const { id, Postid } = req.body;
    Post.findById(Postid)
      .exec()
      .then(P => {
        if (!P) {
          throw new Error("El post no fue encontrado o no existe");
        }
        return res.json(P.likes.includes(id));
      })
      .catch(err => {
        return res.status(400).json({
          error: err.message,
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

exports.fileCheck = async (req, res) => {
try {
    if (req.Post.file.data) {
    return res.send({ success: true });
    } else {
    return res.send({ success: false });
    }
} catch (err) {
    return res.status(400).json({
    error: err.message,
    });
}
};

exports.file = (req, res) => {
    const postId = req.params.PostId;
    Post.findById(postId)
    .then((post) => {
    console.log(post.file.contentType)
      if (!post || !post.file) {
        return res.status(404).json({ error: "PDF not found" });
      }

      res.set("Content-Type", post.file.contentType);
      res.send(Buffer.from(post.file.data, "base64"));
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};
  
  
