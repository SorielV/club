import { Router } from 'express'
import Controller from './blog.controller'
import { ErrorHandle, HandleAuth, isAuth, isAdmin } from './../../../../middleware'

const router = Router()

router
  .get('/', ErrorHandle(Controller.getBlog))
  .get('/:id', ErrorHandle(Controller.getBlog))
  .use(HandleAuth)
  .use(isAuth)
  .post('/', ErrorHandle(Controller.create))
  .put('/:id', ErrorHandle(Controller.updateBlog))
  .delete('/:id', ErrorHandle(Controller.deleteBlog))

export default router
