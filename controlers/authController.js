const User = require('./../models/User')
const Role = require('./../models/Role')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                console.log("Error during registration")
            }
            const {username, password, role} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                console.log("User with  that username already exists")
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: role})
            const user = new User({username, password: hashPassword, role: userRole.value })
            await user.save()
            return res.redirect('/')
        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                console.log(`User ${username} was not found`)
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                console.log
                ( `Wrong password`)
            }
            return res.redirect('/')
        } catch (e) {
            console.log(e)
        }
    }

    async getUsers(req, res) {
        try {
            res.json("users")
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()