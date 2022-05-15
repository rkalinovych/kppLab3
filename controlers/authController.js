const User = require('./../models/User')
const Role = require('./../models/Role')
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Error during registration", errors})
            }
            const {username, password, role} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "User with  that username already exists"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: role})
            const user = new User({username, password: hashPassword, role: userRole.value })
            await user.save()
            return res.json({message: "User registrated"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            
        } catch (e) {

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