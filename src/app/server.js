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

var trueResult = { status: true }
var falseResult = { status: false }


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



// SignUp User

app.post("/signUp", (req, res) => {
    console.log("Entered Backend");
    console.log(req.body);
    let { orgName, email, password, mobileNo } = req.body

    let sql = "select id,email,isVerified from signupUsers where email=?"
    connection.query(sql, [req.body.email], (err, selectResult) => {
        if (err) {
            console.error(err.stack);
            res.send(falseResult)
            return;
        }
        // console.log("selectResult",selectResult);
        else if (selectResult.length > 0) {
            if (selectResult.isVerified == 0) {
                console.log("Please Verify Mail");
                res.send(falseResult);
                return;
            }
            console.log("Something went wrong!");   // Redirect to Login
            res.send(falseResult)
            return;
        }
        else {
            let token = jwt.sign({
                email: email + parseInt(Math.random() * 10)
            }, "yc@3"
            );
            bcrypt.hash(password, 10, function (err, hash) {
                // console.log("Hashed", hash);
                if (err) {
                    console.error(err.stack);
                    res.send(falseResult)
                    return;
                }
                let sql = "insert into signupUsers(orgName,email,password,mobileNo, token) values(?,?,?,?,?)";
                connection.query(sql, [orgName, email, hash, mobileNo, token], (err, insertResult) => {
                    if (err) {
                        console.error(err.stack);
                        res.send(falseResult)
                        return;
                    }
                    console.log("insertResult", insertResult);
                    res.send(trueResult);
                })
            })
        }

        // res.send("Select Success")
    })
})



// Get User


app.get("/getUserDetails", (req, res) => {
    let sql = "select orgName from signupUsers where email=?";
    connection.query(sql, [req.query.token], (err, getResult) => {
        if (err) {
            console.error(err.stack);
            res.send(falseResult)
            return;
        }
        res.send(getResult);
        return;
    })
})


app.listen(3000, () => {
    console.log("App Running");
})