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
const { async } = require("rxjs");

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


// Activation Mail 

function activationMail(email, token) {
    return new Promise((resolve, reject) => {
        console.log("Activation Processing", token);
        var transporter = nodemailer.createTransport({
            host: process.env.HOST_EMAIL,
            port: 2525,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        var mailOptions = {
            from: "yc@yc.com",
            to: email,
            subject: "Verify Your Account",
            text: "To verify your account",
            html:
                '<html><body><p>To verify your account</p><a href="http://localhost:4200/activation/' +
                token +
                '">Click Here</a></body></html>',
            dsn: {
                id: "ID",
                return: "headers",
                notify: "success",
                notify: ["failure", "delay"],
                recipient: "yc@yc.com",
            },
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error(error.stack);
                console.log(error);
                reject(false);
            } else {
                console.log("Email sent: " + info.response);
                resolve(true);
            }
        });
    });
}





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
                connection.query(sql, [orgName, email, hash, mobileNo, token], async (err, insertResult) => {
                    if (err) {
                        console.error(err.stack);
                        res.send(falseResult)
                        return;
                    }
                    console.log("insertResult", insertResult);
                    let resp = await activationMail(email, token);
                    if (resp) {
                        res.send(trueResult);
                        return;
                    }
                    res.send(falseResult)
                })
            })
        }

        // res.send("Select Success")
    })
})



// Get User


app.get("/getUserDetails", (req, res) => {
    let sql = "select orgName from signupUsers where email=?";
    connection.query(sql, [req.query.email], (err, getResult) => {
        if (err) {
            console.error(err.stack);
            res.send(falseResult)
            return;
        }
        res.send(getResult);
        return;
    })
})


// Verify Token

app.get("/verifyUser", (req, res) => {
    let sql = "select id,email,orgName,token from signupUsers where token=?";
    connection.query(sql, [req.query.token], (err, verifyResult) => {
        if (err) {
            console.error(err.stack);
            res.send(falseResult)
            return;
        }
        else if(verifyResult.length == 1){
            let sql = "update signupUsers set token=null, isVerified=? where token=?";
            
        }
        res.send(verifyResult);
        return;
    })
})



app.listen(3000, () => {
    console.log("App Running");
})