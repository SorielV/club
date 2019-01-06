import { Router } from 'express'
import Controller from './club.controller'
import { ErrorHandle, HandleAuth, isAuth, isAdmin } from './../../../../middleware'

const router = Router()

router
  .get('/', ErrorHandle(Controller.getClubs))
  .get('/:id', ErrorHandle(Controller.getClubs))
  //.use(HandleAuth, isAuth)
  .post('/', ErrorHandle(Controller.createClub))
  .put('/:id', ErrorHandle(Controller.updateClub))
  .delete('/:id', ErrorHandle(Controller.deleteClub))

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
