import jwt from 'jsonwebtoken'
import jwtConfig from './../../config/jwt.json'

const ADMIN = 1

// Auth Information
const authInformation = req => {
  return new Promise((resolve, reject) => {
    const header = req.headers.authorization

    if (!header) {
      return reject(new Error('Token no enviado'))
    } else if (header.lenght < 30) {
      return reject(new Error('Token no Valido'))
    } else {
      const token = header.substr(7).trim()

      jwt.verify(token, jwtConfig.secret, (error, user) => {
        if (error) return reject(error)
        return resolve({ user, token })
      })
    }
  })
}

/** Required Auth **/

// Normal Auth
export const HandleAuth = async (req, res, next) => {
  try {
    const {
      user, token
    } = await authInformation(req)

    req.user = user
    req.token = token

    return next()
  } catch (error) {
    req.error = error.message
    return next()
  }
}

// Normal Authorization
export const isAuth = async (req, res, next) => {
  if (req.user) {
    return next()
  } else {
    if (req.error) {
      return res
        .status(403)
        .json({ message: req.error })
        .end()
    } else {
      return res
        .status(404)
        .json({ message: 'No has ingresado' })
        .end()
    }
  }
}

// Privileged Authorization
export const isAdmin = async (req, res, next) => {
  if (req.user &&  req.user.type === ADMIN) {
    return next()
  } else {
    if (req.error) {
      return res
        .status(403)
        .json({ message: req.error })
        .end()
    } else {
      return res
        .status(403)
        .json({ message: 'No tienes los privilegios de administrador' })
        .end()
    }
  }
}

// TODO: Guardar [idClub, rol] acorde a los clubes de usuario
// FIX: query { idClub } 
export const isMember = async (req, res, next) => {
  const { idClub } = req.query
  if (req.user &&  req.user.clubs.includes(idClub)) {
    return next()
  } else {
    if (req.error) {
      return res
        .status(403)
        .json({ message: req.error })
        .end()
    } else {
      return res
        .status(403)
        .json({ message: 'No eres miembro C:' })
        .end()
    }
  }
}