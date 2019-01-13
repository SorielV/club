// TODO: passport
import { Router } from 'express'
import Controller from './login.controller'
import { ErrorHandle, HandleAuth, isAuth, isNotAuth, isAdmin } from './../../../../middleware'

const router = Router()

// TODO: Passport login (google, facebook, twitter, github)
router
  .use(HandleAuth)
  .get('/login', isAuth, (req, res, next) => {
    return res
      .status(200)
      .json({ data: req.user })
      .end()
  })
  .use(isNotAuth)
  .post('/login', ErrorHandle(Controller.login))
  .post('/singup', ErrorHandle(Controller.singup))

export default router
