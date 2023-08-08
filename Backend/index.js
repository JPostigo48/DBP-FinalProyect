const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const bodypaser = require('body-parser');
const mongoose = require("mongoose");

const userRouter = require('./routes/user.routes.js')
const postRouter = require('./routes/post.routes.js')

const app = express();

// Variables de entorno
dotenv.config({
  path: './config/config.env'
})


app.use(bodypaser.json())

// Morgan solo en modo de desarrollo
if(process.env.NODE_ENV ==='development'){
  app.use(cors({
      origin: process.env.CLIENT_URL
  }))

  app.use(morgan('dev'))
}

mongoose.connection.on("open", () => {
  console.log("Base de datos conectada");
});

mongoose.connection.on('error', err => {
  console.log("Hubo un eror: ", err);
});

mongoose.connection.on('disconnected', err => {
  console.log("Base de datos desconectada");
});

let { HOST, DBPORT, DBNAME } = process.env;

const uri = `mongodb://${HOST}:${DBPORT}/${DBNAME}`;
mongoose.connect(uri).catch(error => console.log("Hubo un eror: ", error));

app.use('/api/u', userRouter);
app.use('/api/p', postRouter);

app.use((req,res,next)=>{
  res.status(400).json({
      err: "Pagina no encontrada"
  })
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Escuchando por el puerto ${PORT}`)
})