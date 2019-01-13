import jwt from 'jsonwebtoken'
import jwtConfig from './../config/jwt.json'

export const COOKIE_KEY = process.env.COOKIE_JWT_KEY || 'SESSIONID' 

/**
 * Sing an object retuing jwt token
 * @param {object} object Object that will be signed
 */
export const sing = object => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      object,
      jwtConfig.secret,
      { expiresIn: jwtConfig.tokenLife },
      (error, token) => {
        return error
          ? reject(error)
          : resolve(token)
      }
    )
  })
}

/**
 * Verify a jwt token 
 * @param {string} token JWT Token
 * @return {object}
 */
export const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtConfig.secret, (error, data) => {
      return error
          ? reject(error)
          : resolve(data)
    })
  })
}

/**
 * Set SESSIONID by JWT Token
 * @param {express: response} response
 * @return {express: response}
 */
export const cookieBase = async (res, data) => {
  const token = await sing(data)

  res.cookie(
    COOKIE_KEY,
    token,
    { httpOnly: true, secure: false })

  return res
}

/**
 * Set header authorization by JWT Token
 * @param {express: response} res 
 * @param {*} data 
 */
export const sessionStorageBase = async (res, data) => {
  const token = await sing(data)
  req.headers.authorization = 'Bearer ' + token
  return res
}
