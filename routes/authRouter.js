const Router = require('express')
const router = new Router()
const controller = require('./../controlers/authController')
const {check} = require("express-validator")

router.get('/registration', async (req, res) => {
    res.render('registration')
  })

router.get('/login', async (req, res) => {
  res.render('login')
})
router.post('/registration', [
  check('username', "Email cannot be empty").notEmpty(),
  check('password', "Password should be greater than 4 and less than 10").isLength({min:4, max:10})
], controller.registration)

router.post('/login', controller.login)
router.get('/users', controller.getUsers)

module.exports = router