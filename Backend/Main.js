const express = require('express');
const app = express();
const cors = require('cors');
const { Config } = require('./Config/App.config');
const { errors } = require('celebrate');
//Puerto
app.set('port', Config.Port);

//Uses
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(errors());

require('./Routes/User.routes').UserRoutes(app);

//Listen
app.listen(app.get('port'), () => {
    console.log('Init')
});
