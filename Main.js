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

//send the frontend made in react
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/Frontend/build/index.html'))
});

//Require routes
require('./Backend/Routes/User.routes').UserRoutes(app);
require('./Backend/Routes/Group.routes').GroupRoutes(app);
require('./Backend/Routes/Conversation.routes').ConversationRoutes(app);

//init server
const server = app.listen(Config.Port, () => {
  console.log(`http://localhost:${Config.Port}`)
});

//moongose connect
mongoose.connect(Config.Db, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }, (err, res) => {
  if (err) {
    return console.log(`${err}`)
  }

  require('./Backend/Controllers/Socket.controllers').SocketConfig(server);
});

module.exports = server;