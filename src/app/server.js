const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();
var { expressjwt: jwtverify } = require("express-jwt");
const rateLimit = require("express-rate-limit");
const { check, validationResult } = require('express-validator');
const { async, isEmpty } = require("rxjs");

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

function activationMail(email, htmlPage) {
    return new Promise((resolve, reject) => {
        console.log("Activation Processing");
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
            html: htmlPage,
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
            res.send(falseResult);
            return;
        }
        // console.log("selectResult",selectResult);
        else if (selectResult.length > 0) {
            if (selectResult[0]?.isVerified == 0) {
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
                    res.send(falseResult);
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
                    let htmlPage = '<html><body><p>To verify your account</p><a href="http://localhost:4200/activation/' +
                        token +
                        '">Click Here</a></body></html>'
                    let resp = await activationMail(email, htmlPage);
                    if (resp) {
                        res.send(trueResult);
                        return;
                    }
                    res.send(falseResult)
                })
            })
        }
    })
})



// Get User


app.get("/getUserDetails", (req, res) => {
    let sql = "select orgName from signupUsers where email=?";
    connection.query(sql, [req.query.email], (err, getResult) => {
        if (err) {
            console.error(err.stack);
            res.send(falseResult);
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
            res.send(falseResult);
            return;
        }
        else if (verifyResult.length == 1) {
            let sql = "update signupUsers set token=null, isVerified=? where token=?";
            connection.query(sql, [1, req.query.token], (err, verifiedResult) => {
                if (err) {
                    console.error(err.stack);
                    res.send(falseResult);
                    return;
                }
                let result = { verifiedResult, verifyResult }
                res.send(result);
                return;
            })
        }
        else {
            res.send(falseResult);
            return;
        }
    })
})


// Login

app.post("/login",
[check('email').not().isEmpty().withMessage("Email is Required"),
check('password').not().isEmpty().withMessage("Password is Required").isLength({min : 8}).withMessage("Password shoul be 8")],
(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    console.log("Login Api Successful", req.body);
    let { email, password } = req.body;
    let sql = "select email, password, isBlocked,isVerified,isDeleted,loginCount,unix_timestamp(now()) - blockTime as nowTime from signupUsers where email=?";
    connection.query(sql, [email], (err, loginResult) => {
        if (err) {
            console.error(err.stack);
            res.send(falseResult);
            return;
        }
        else if (loginResult.length > 0) {
            console.log("Login Result 1", loginResult);
            let count = loginResult[0]?.loginCount;
            if (count == 3 && loginResult[0]?.isBlocked == 1) {
                if (loginResult[0]?.nowTime > 86400) {
                    let sql = "update signupUsers set blockTime = null, isBlocked=?, loginCount=? where id=?";
                    connection.query(sql, [0, 0, loginResult[0]?.id], (err, blockUpdate) => {
                        if (err) {
                            console.error(err.stack);
                            res.send(falseResult);
                            return;
                        }
                        console.log("BlockUpdate", blockUpdate);
                        res.send(trueResult);
                    })
                }
            }
            console.log("verify before", loginResult);
            if (loginResult[0]?.isVerified == 1) {
                console.log("Verified");
                bcrypt.compare(password, loginResult[0]?.password, (err, compareResult) => {
                    if (err) {
                        console.error(err.stack);
                        res.send(falseResult);
                        return;
                    }
                    else if (compareResult && loginResult[0]?.isBlocked == 0) {
                        console.log("Login Successful");
                        let token = jwt.sign({ email: email + parseInt(Math.random() * 10) }, "yc@3");
                        res.send(trueResult);
                    }
                    else {
                        console.log("Password Mismatched");
                        let count = loginResult[0]?.loginCount
                        if (loginResult[0].loginCount < 2) {
                            let sql = "update signupUsers set loginCount = ? where id =?";
                            connection.query(sql, [count + 1, loginResult[0]?.id], (err, countUpdate) => {
                                if (err) {
                                    console.error(err.stack);
                                    res.send(falseResult);
                                    return;
                                }
                                res.send(trueResult);
                                return;
                            })
                        }
                        let sql = "update signupUsers set blockTime=unix_timestamp(now()), isBlocked=?, loginCount=? where id=?";
                        connection.query(sql, [1, count + 1, loginResult[0]?.id], (err, blockUpdate) => {
                            if (err) {
                                console.error(err.stack);
                                res.send(falseResult);
                                return;
                            }
                            res.send(trueResult);
                        })
                    }
                })
                return;
            }
            res.send(falseResult);      // Not Verified

        }
        else {
            res.send(falseResult);      // No Result or Blocked
        }
    })
})


// Forgot Password

app.post("/forgotPassword", (req, res) => {
    let { email } = req.body
    let sql = "select id,email from signupUsers where email=?";
    connection.query(sql, [email], (err, forgotResult) => {
        if (err) {
            console.error(err.stack);
            res.send(falseResult);
            return;
        }
        else if (forgotResult.length == 1) {
            let token = jwt.sign({ email: email + parseInt(Math.random() * 10) }, "yc@3");
            let sql = "insert into forgotPassword(email,token) values(?,?)";
            connection.query(sql, [email, token], async (err, insertResult) => {
                if (err) {
                    console.error(err.stack);
                    res.send(falseResult);
                    return;
                }
                let htmlPage = '<html><body><p>To verify your account</p><a href="http://localhost:4200/reset-password/' +
                    token +
                    '">Click Here</a></body></html>'
                    let resp = await activationMail(email, htmlPage);
                    if(resp){
                        res.send(trueResult);
                        return;
                    }
                    res.send(falseResult);
            })
        }
    })
})


// Reset Password

app.put("/resetPassword", (req, res)=>{
    
})


app.listen(3000, () => {
    console.log("App Running");
})