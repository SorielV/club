import { User, UserInfo } from './../../../../../models/user'
import bcrypt from 'bcrypt';

const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

const LoginAPI = {
  async singup(req, res, next) {
    const { password } = req.body
    const user = new User(req.body)
    user.password = await bcrypt.hash(password, salt)
    await user.save()
    return res
      .status(200)
      .json({ data: user })
      .end()
  },
  async login(req, res, next) {
    const { username, password } = req.body
    const user = await User.getOne({ username })
    const match = await bcrypt.compare(password, user.password || null)

    if (match) { // login
      return res
        .status(200)
        .json({ data: user })
        .end()
    } else { 
      return res
        .status(400)
        .json({ message: 'Usuario o contrasenio incorrecto' })
        .end()
    }
  },
  logout(req, res, next) {
    
  }
}

