import { Router } from 'express'
import Controller from './blog.controller'
import { ErrorHandle, HandleAuth, isAuth, isAdmin } from './../../../../middleware'

const router = Router()

router
  .get('/', ErrorHandle(Controller.getBlog))
  .get('/:id', ErrorHandle(Controller.getBlog))
  //.use(HandleAuth, isAuth)
  .post('/', ErrorHandle(Controller.create))
  .put('/:id', ErrorHandle(Controller.updateBlog))
  .delete('/:id', ErrorHandle(Controller.deleteBlog))

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
