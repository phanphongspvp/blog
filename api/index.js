const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();

const router = require("./routes");
const db = require("./config/db");

//Config dotenv
dotenv.config();

//Port App
const port = process.env.PORT || 3000;

//Connect database
db.connect(process.env.URL_DATABASE);

//Middleware cors
app.use(
  cors({
    origin: process.env.URL_CLIENT,
    credentials: true,
  })
);

//Middleware cookieParser
app.use(cookieParser());

//Middleware http
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Router App
router(app);

//Listen App
app.listen(port, () => {
  console.log("App listening port:", port);
});
