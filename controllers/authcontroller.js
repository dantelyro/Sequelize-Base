const jwt = require('jsonwebtoken')
const md5 = require('md5')
const { Op } = require('sequelize')
const User = require('../models/User')
const chaveSecreta = 'mysecret'

module.exports = class AuthController {
  static async login(req, res) {
    const { username, password } = req.body

    const user = {
      username,
      password: md5(password),
    }

    const session = await User.findOne({
      attributes: ['id'],
      where: {
        [Op.and]: [{ username: user.username }, { password: user.password }],
      },
    })

    if (session) {
      jwt.sign({ session }, chaveSecreta, { expiresIn: '10h' }, function (err, token) {
        if (err) {
          return res.status(500).send('erro ao registrar a sessão')
        }
        res.send({ auth: true, token: token })
      })
    }
  }

  static verifyToken(req, res, next) {
    let token = req.headers['authorization']
    if (!token)
      return res.status(401).send({
        auth: false,
        message: 'Token não informado.',
      })

    jwt.verify(token, chaveSecreta, function (err, decoded) {
      if (err) {
        //return res.status(500).send({ auth: false, message: 'Token inválido.' });
        return res.status(500).send({
          auth: false,
          message: 'Token inválido.',
        })
      }
      next()
    })
  }
}
