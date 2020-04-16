const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secretkey'

users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      created: today
    }

    User.findOne({
        email: req.body.email
      })
      .then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              userData.password = hash
              User.create(userData)
                .then(user => {
                  res.json({ status:"success",Data: user.email + 'registered!',message:user.email + 'registered!' })
                })
                .catch(err => {
                  res.send('error: ' + err)
                })
            })
          } else {
            res.json({ status:"fail",Data: 'User already exists',message:'User already exists' })
          }
        })
        .catch(err => {
          res.json({ status:"fail",Data: err,message:err })
        })
    })



    users.post('/login', (req, res) => {
        User.findOne({
          email: req.body.email
        })
          .then(user => {
            if (user) {
              if (bcrypt.compareSync(req.body.password, user.password)) {
                // Passwords match
                const payload = {
                  _id: user._id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                  expiresIn: '1h'
                })
                res.json({token:token,message:'Login Successful',status:'success'})
              } else {
                // Passwords don't match
                res.json({ status:"fail",error: 'Password doesnt match',message:'Password doesnt match' })
              }
            } else {
              res.json({ status:"fail",error: 'User does not exist',message:'User does not exist' })
            }
          })
          .catch(err => {
            res.json({ status:"fail",error: err,message:err })
          })
      })

//This route is not actually used in front end.
//In front end we generate and store the token on the basis of mail,password and secretkey.....so when we decode the token we get the mail,password.....and thus we get all info by decoding token
users.get('/profile', (req, res) => {
    //pass it without bearer in this case.....jwt.verify takes token without keyword 'Bearer '
    console.log(req.headers['authorization'])
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users