import { Router } from 'express'
import Controller from './tag.controller'
import { 
  ErrorHandle,
  HandleAuth,
  isAdmin,
  isMember
} from './../../../../../middleware'

const router = Router()

router
  .get('/', ErrorHandle(Controller.getBlogTag))
  .get('/:id', ErrorHandle(Controller.getBlogTag))
  .use(HandleAuth)
  .use(isMember)
  .post('/', ErrorHandle(Controller.addBlogTag))
  .delete('/:id', ErrorHandle(Controller.deleteBlogTag))

export default router
