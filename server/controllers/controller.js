var jwt = require('jsonwebtoken');
const UserModel = require('../models/userSchema')

const connection = (req, res) => {
    res.send('Hello')
}

const isLoggedIn = (req, res, next) => {
    if (!token) {
        res.send({ mes: 'Token Missing' })
    }
    else {
        jwt.verify(token, process.env.JWT_SECRETKEY, (err, decoded) => {
            if (err) {
                res.send({ mes: 'Error with token' })
            }
            else {
                next();
                // console.log(decoded);
            }
        })
    }
}
const login = async (req, res) => {
    let { email, password } = req.body
    try {
        const user = await UserModel.find({ email: email })
        res.send({user:user})
        return;
        if (user) {
            if (user.password == password) {
                const tokenData = {
                    email: user.email,
                    id: user._id
                }
                const token = jwt.sign(tokenData, process.env.JWT_SECRETKEY,{
                    expiresIn:'1d'
                });
                res.send({ mes: 'Login Successfully', token })
            }
            else {
                res.send({ mes: 'Wrong Password' })

            }
        }
        else {
            res.send({ mes: 'Account Not Exists' });
        }
    } catch (error) {
        console.log(error);
    }
}
const register = async (req, res) => {
    let { name, email, password } = req.body
    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            res.send({ mes: 'User Already Registered ' })
        }
        else {
            const user = await UserModel({ name, email, password }).save()
            if (user) {
                res.send({ mes: 'Account Registered Succesfully' });
            }
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports = { connection, isLoggedIn, register, login }
