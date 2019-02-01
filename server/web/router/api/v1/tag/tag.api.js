import { Router } from 'express'
import Controller from './tag.controller'
import { ErrorHandle, HandleAuth, isAuth } from './../../../../middleware'

const router = Router()

router
  .get('/', ErrorHandle(Controller.get))
  .get('/:id', ErrorHandle(Controller.get))
  .use(HandleAuth)
  .use(isAuth)
  .post('/', ErrorHandle(Controller.create))
  .put('/:id', ErrorHandle(Controller.update))
  .delete('/:id', ErrorHandle(Controller.delete))

export default router
