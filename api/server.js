const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // Importing the cookie-parser library
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require('./middlewares/auth.middleware'); // Importing the checkUser function from the auth.middleware file

const app = express();
const userRoutes = require('./routes/user.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


//JWT 
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
}); // Adding the requireAuth middleware to the /api/user route



//ROUTES
app.use('/api/user', userRoutes);

//SERVERS
app.listen(process.env.PORT, () => {
  console.log('Server listening on port ${process.env.PORT}');
});
