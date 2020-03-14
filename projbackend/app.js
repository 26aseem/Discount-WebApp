//Express and Mongoose
require('dotenv').config();

const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const adminauthRoutes = require('./routes/adminauth')
const merchantauthRoutes = require('./routes/merchantauth')

const mongoose = require('mongoose');

//Database connection is established
mongoose.connect(process.env.DATABASE,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log("DATABASE CONNECTED")
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
///api is added before all 
app.use("/api",adminauthRoutes);
app.use("/api",merchantauthRoutes);

//Port for listening
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
    console.log(`WebApp is running... at ${port}`)
});



