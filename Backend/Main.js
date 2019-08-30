const express = require('express');
const app = express();
const cors = require('cors');

//Puerto
app.set('port', process.env.PORT || 3000);

//Uses
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

require('./Routes/User.routes').UserRoutes(app);

//Listen
app.listen(app.get('port'), () => {
    console.log('Init')
});
