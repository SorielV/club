import { Router } from 'express'
import Controller from './topic.controller'
import { 
  ErrorHandle,
  HandleAuth,
  isAdmin,
  isMember
} from './../../../../../middleware'

const router = Router()

router
  .get('/', ErrorHandle(Controller.getBlogTopic))
  .get('/:id', ErrorHandle(Controller.getBlogTopic))
  .use(HandleAuth)
  .use(isMember)
  .post('/', ErrorHandle(Controller.addBlogTopic))
  .delete('/:id', ErrorHandle(Controller.deleteBlogTopic))

export default router
