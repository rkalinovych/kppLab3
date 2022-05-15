const Router = require('express')
const router = new Router()
const controller = require('./../controlers/authController')

router.get('/', async (req, res) => {
    res.render('registration')
  })
router.post('/registration', controller.registration)

router.post('/login', controller.login)
router.get('/users', controller.getUsers)

module.exports = router