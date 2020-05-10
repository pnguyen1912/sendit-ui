const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.listen(8080)

const connection = mysql.createConnection({
  host: "aa1lra2lijiu110.cmzwhhc2xh1e.us-east-2.rds.amazonaws.com",
  user: "username",
  password: "password",
  port: 3306
})

connection.connect(err => {
  if (err) {
    console.error(err)
  } else {
    console.log('Connected!!! YAHOOO!!!!')
  }
})

    app.post('/createuser', (req, res) => {
      console.log(req.body)
      connection.query(fs.readFileSync('./sql/createUser.sql').toString(), [req.body.email, req.body.password1,req.body.firstName,req.body.lastName, 'no'], (err, resp) => {
        if (err) {
          res.json(err)
        }
        res.json(resp)
      })
    })

    app.post('/getuserdata', (req, res) => {
      console.log(req.body)
      connection.query(fs.readFileSync('./sql/getUser.sql').toString(), [req.body.email], (err, resp) => {
        if (err) {
          res.json(err)
        }
        if (resp[0] === undefined){
          res.json('No email found')
        } else{
        if (req.body.password === resp[0].password) {
          res.json({firstName: resp[0].FirstName, 
            lastName: resp[0].LastName,
            email: resp[0].emailAddress,
            withAddress: resp[0].WithAddress})
        } else {
          res.json('Not Corrected')
        }
      }
      })
    })

    app.post('/getuserinfo', (req, res) => {
      console.log(req.body)
      connection.query(fs.readFileSync('./sql/getUser.sql').toString(), [req.body.email], (err, resp) => {
        if (err) {
          res.json(err)
        }
        if (resp[0] === undefined){
          res.json('No email found')
        } else{
     res.json(resp[0])
      }
      })
    })

    app.post('/getuseraddress', (req, res) => {
      console.log(req.body)
      connection.query(fs.readFileSync('./sql/getUserAddress.sql').toString(), [req.body.email], (err, resp) => {
        if (err) {
          res.json(err)
        }
        if (resp[0] === undefined){
          res.json('No address found')
        } else{
          res.json(resp[0])
      }
      })
    })

    app.post('/adduseraddress',(req,res)=>{
      console.log(req.body)
      connection.query(fs.readFileSync('./sql/AddNewUserAddress.sql').toString(),[
        req.body.email,req.body.fullName, req.body.Address, req.body.City, req.body.State, req.body.ZipCode
      ],(err,resp)=>{
        if (err) {
          res.json(err)
        }
        res.json(resp)
      })
    })

    app.post('/updateuseraddress',(req,res)=>{
      console.log(req.body)
      connection.query(fs.readFileSync('./sql/UpdateUserAddress.sql').toString(),[
        req.body.fullName, req.body.Address, req.body.City, req.body.State, req.body.ZipCode,req.body.email
      ],(err,resp)=>{
        if (err) {
          res.json(err)
        }
        res.json(resp)
      })
    })