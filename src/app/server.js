const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const check = require("express-validator");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();
var { expressjwt: jwtverify } = require("express-jwt");
const rateLimit = require("express-rate-limit");
const { body } = require("express-validator");

const saltRounds = 10;
var count;
app = express();
app.use(cors());
app.use(express.json());


// MYSQL CONNECTION

var connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

connection.connect(function (err) {
    if (err) {
        console.error("error connecting" + err.stack);
        return;
    }
    console.log("connected as id :", +connection.threadId);
});


app.post("/signUp",(req, res)=>{
    console.log("Entered Backend");
    console.log(req.body);
    res.send({result : "success"})
})


app.listen(3000, () => {
    console.log("App Running");
})