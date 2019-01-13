import { verify, COOKIE_KEY } from './../../utils/jwt'

// Auth Information
export const authInformation = async (req) => {
  return await (process.env.AUTH_BASE === 'st'
    ? getSessionHeader(req)
    : getSessionCookie(req)
  )
}

/** Required Auth **/

// Normal Auth
export const HandleAuth = async (req, res, next) => {
  try {
    const {
      data: user,
      token
    } = await authInformation(req)

    req.user = user
    req.token = token    

    return next()
  } catch (error) {
    console.log(error)
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

export const isNotAuth = async (req, res, next) => {
  if (req.user) {
    return res.redirect('/')
  } else {
    return next()
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

/**
 * Set request user if the request is signed based in cookies
 * @param {express: request} req 
 * @param {express: response} res 
 * @param {express: next} next
 */
export const sessionCookie = async (req, res, next) => {
  if (req.cookies[COOKIE_KEY]) {
    req.user = await verify(req.cookies[COOKIE_KEY])
    req.token = req.cookies[COOKIE_KEY]
  }
  return next()
}

/**
 * Set request user if the request is signed based in headers
 * @param {express: request} req 
 * @param {express: response} res 
 * @param {express: next} next
 */
export const sessionHeader = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1]
    req.user = await verify(token)
    req.token = token
  }
  return next()
}

export const getSessionHeader = async (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1]
    return {
      data: await await verify(token),
      token
    }
  } else {
    return {}
  }
}

export const getSessionCookie = async (req) => {
  if (req.cookies[COOKIE_KEY]) {
    const token = req.cookies[COOKIE_KEY]

    return {
      data: await verify(token),
      token
    }
  } else {
    return {}
  }
}

export const logoutSessionStorageBase = (req, res, next) => {
  // TODO: LS logout (Client-side implementation)
  return res.redirect('/')
}

export const logoutCookieBase = (req, res, next) => { 
  res.clearCookie(COOKIE_KEY)
  return res.redirect('/')
}
