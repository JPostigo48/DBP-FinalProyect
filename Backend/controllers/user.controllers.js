const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Crea un nuevo usuario
exports.create = (req, res) => {
  const user = new User(req.body);
  user.save().then(r => {
    res.json({ message:"Creado exitosamente" })
  }).catch(err => {
    res.status(400).json({
      error: err,
    });
  });
};

// Verifica que exista un usuario
exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({email}).then( user => {
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Contraseña incorrecta",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, names, surnames, city, email, status, followers, following } = user;
    return res.json({
      token,
      user: { _id, names, surnames, city, email, status, followers, following },
      domain: "EPCC",
    });
  }).catch( err => {
    return res.status(400).json({
      error: "Este email no está registrado: " + err,
    });
  })
};

// Modifica los datos de un usuario
exports.modify = (req, res) => {
  const { names, surnames, email, password, newpassword, status } = req.body;

  User.findOne({email}).then( user => {
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Contraseña incorrecta",
      });
    }

    user.names = names;
    user.surnames = surnames;
    user.password = newpassword;
    user.status = status;
    user.save();

    return res.status(200).json({
      message: "Ok",
    });
  }).catch( err => {
    return res.status(400).json({
      error: "Este email no está registrado: " + err,
    });
  })
};


exports.addCity = (req, res) => {
  const { email, password, city } = req.body;
  User.findOne({email}).then( user => {
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Contraseña incorrecta",
      });
    }
    console.log(user.names)
    user.city = city;
    user.save();

    return res.status(200).json({
      message: "Ok",
    });
  }).catch( err => {
    return res.status(400).json({
      error: "Este email no está registrado: " + err,
    });
  })
};

// Verifica si un usuario sigue a otro
exports.followCheck = (req, res) => {
  const { id, Userid } = req.body;

  User.findById(Userid)
    .exec()
    .then((U2) => {
      if (!U2) {
        throw new Error("El usuario no fue encontrado o no existe");
      }
      res.json(U2.followers.includes(id));
    })
    .catch((err) => {
      res.status(400).json({
        error: err.message,
      });
    });
};

// Agrega U1 a la lista de seguidores de U2, y U2 a la lista de seguidos de U1
exports.followModify = (req, res) => {
  const { id, Userid } = req.body;

  User.findById(Userid)
    .exec()
    .then((U2) => {
      if (!U2) {
        throw new Error("El usuario no fue encontrado o no existe");
      }
      return User.findById(id).exec();
    })
    .then((U1) => {
      if (!U1) {
        throw new Error("El usuario no fue encontrado o no existe");
      }

      if (U2.followers.includes(id)) {
        U2.followers.splice(U2.followers.indexOf(id), 1);
        U1.following.splice(U1.following.indexOf(Userid), 1);
      } else {
        U2.followers.push(id);
        U1.following.push(Userid);
      }

      return Promise.all([U2.save(), U1.save()]);
    })
    .then(() => {
      res.json(U2.followers.includes(id));
    })
    .catch((err) => {
      res.status(400).json({
        error: err.message,
      });
    });
};


exports.data = (req, res) => {
  const { names, surnames, city, email, status, followers, following } = req.User;
  return res.json({
    names,
    surnames,
    city,
    email,
    status,
    followers,
    following,
  });
};

exports.UserById = (req, res, next, id) => {
  User.findById(id)
      .exec()
      .then(User => {
          if (!User) {
              throw new Error("El usuario no fue encontrado o no existe");
          }
          req.User = User;
          next();
      })
      .catch(err => {
          res.status(400).json({
              error: err.message
          });
      });
};
