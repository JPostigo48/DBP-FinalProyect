const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Un título es necesario',
  },
  author: {
    type: mongoose.Schema.Types.ObjectID,
    ref:'User',
    required: 'Hubo un error al cargar tu publicación, intenta cerrar sesión y volver a entrar',
  },
  description: {
    type: String,
    required: 'Una descripción es necesaria, no importa si es breve',
  },
  file: {
    data: Buffer,
    contentType: String,
  },
  labels: [{
    type: String,
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectID,
    ref:'User',
  }],
  comments: [{
    type: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
  }],
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);