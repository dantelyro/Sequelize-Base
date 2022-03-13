const { Op } = require('sequelize')
const User = require('../models/User')
const md5 = require('md5')

module.exports = class UserController {
  static async register(req, res) {
    const { username, name, email, password, confirmPassword } = req.body
    console.log(req.body)

    if (password !== confirmPassword) {
      res.send('senhas não conferem')
      return
    }

    const user = {
      username,
      name,
      email,
      password: md5(password)
    }

    await User.create(user)
      .then(res.send('Usuario cadastrado'))
      .catch((error) => console.error(error))
  }

  static async search(req, res) {
    let search = ''
    let col = ''

    if (req.query.search) {
      search = req.query.search

      col = req.query.col || 'name'

      if (req.query.col) {
        col = req.query.col
      }

      const userData = await User.findAll({
        where: {
          [col]: {
            [Op.like]: `%${search}%`
          }
        }
      })
        .then((userData) => res.send(userData))
        .catch((error) => console.log(error))

      return
    }

    const userData = await User.findAll()
      .then((userData) => res.send(userData))
      .catch((error) => console.log(error))
  }

  static async update(req, res) {
    const id = req.body.id

    await User.update({ where: { id: id } })
      .then(res.send('Usuario atualizado'))
      .catch((error) => console.error(error))
  }

  static async delete(req, res) {
    const id = req.body.id

    await User.destroy({ where: { id: id } })
      .then(res.send('Usuario deletado'))
      .catch((error) => console.error(error))
  }
}
