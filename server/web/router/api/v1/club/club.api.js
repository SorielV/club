import { Router } from 'express'
import Club from './../../../../../models/club'
import MemberClub from './../../../../../models/club'
import { ErrorHandle, HandleAuth, isAuth, isAdmin } from './../../../middleware'

const router = Router()

router.get('', ErrorHandle(async (req, res) => {
  const items = await Club.get(req.query)
  return res
    .status(200)
    .json(items)
}))

router.get('/:id', ErrorHandle(async (req, res) => {
  const item = await Club.getOne({ id: req.params.id })
  return res
    .status(200)
    .json(item)
}))

router.use(HandleAuth)

router.post('/', ErrorHandle(async (req, res) => {
  // New Model Remove PK
  const item = await new Model(req.body).save()
  return res
    .status(201)
    .json(item)
}))

router.put('/:id', ErrorHandle(async (req, res) => {
  const item = await Club.update(req.body, { id: req.params.id }).save()
  return res
    .status(201)
    .json(item)
}))

router.delete('/:id', ErrorHandle(async (req, res) => {
  const item = await Club.delete({ id: req.params.id }).save()
  return res
    .status(201)
    .json(item)
}))

export default router

/*const isAuthorizedMember = async(req, res, next) => {
  if (!req.user) {
    return res
      .status(404)
      .json({
        message: 'Uds no cuenta con los permisos para realizar esta accion C:'
      })
      .end()
  }

  const member = await MemberClub.getOne({ idUser: req.user.id })
  if (!member) {
    return res
      .status(404)
      .json({
        message: 'Uds no pertenece a este club no puede realizar esta accion C:'
      })
      .end()
  } else if (member && )
  return next()
}*/