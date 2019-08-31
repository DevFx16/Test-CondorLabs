const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { Config } = require('./Backend/Config/App.config');
const { errors } = require('celebrate');
const mongoose = require('mongoose')
//Puerto
app.set('port', Config.Port);

//Uses
app.use(cors());
app.use(errors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/Frontend/build')));

//sent the frontend made in react
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/Frontend/build/index.html'))
});

require('./Backend/Routes/User.routes').UserRoutes(app);

mongoose.connect(Config.Db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, (err, res) => {
  if (err) {
    return console.log(`${err}`)
  }
  console.log('Mongoose')

  const server = app.listen(Config.Port, () => {
    console.log(`http://localhost:${Config.Port}`)
  });

  //WebSocket
  const SocketIO = require('socket.io');
  const io = SocketIO(server);
  require('./Backend/Controllers/Socket.controllers').SocketConfig(io);
});
