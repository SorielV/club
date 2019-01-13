import { User, UserInfo } from './../../../../../models/user'
import { sing, verify, sessionStorageBase, cookieBase } from './../../../../../utils/jwt'
import bcrypt from 'bcrypt';

const saltRounds = 6
const salt = bcrypt.genSaltSync(saltRounds)

// TODO: in Session Storage or in Cookies 
export const LoginAPI = {
  async singup(req, res, next) {
    const { password } = req.body
    console.log(req.body)
    const user = new User(req.body)
    user.password = await bcrypt.hash(password, salt)
    await user.save()

    // TODO: Fetch rquired data (club, infoUser)
    if (process.env.AUTH_BASE === 'st') {
      sessionStorageBase(res)
    } else {
      cookieBase(res)
    }

    return res
      .status(200)
      .json({ data: user })
      .end()
  },
  async login(req, res, next) {
    const { username = null, password = null } = req.body

    if (!username || !password) {
      return new Error('Datos faltantes')
    }

    const user = await User.findOne({ username })
    const match = await bcrypt.compare(password, user.password || null)

    if (match) { // login
      // TODO: Fetch rquired data (club, infoUser)

      if (process.env.AUTH_BASE === 'st') {
        await sessionStorageBase(res, user)
      } else {
        await cookieBase(res, user)
      }

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
  }
}

export default LoginAPI