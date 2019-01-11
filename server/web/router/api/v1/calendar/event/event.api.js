import Controller from './event.controller'
import { Router } from 'express'

import { 
  ErrorHandle,
  HandleAuth,
  isAuth,
  isAdmin,
  isMember
} from './../../../../../middleware'

const router = Router()

router
  .use(HandleAuth) // Optional Auth
  .get('/', ErrorHandle(Controller.getEvent))
  .get('/:id', ErrorHandle(Controller.getEvent))
  .use(isAuth) // Required Auth
  .use(isMember) // Member Only
  .post('/', ErrorHandle(Controller.addEvent))
  .put('/', ErrorHandle(Controller.updateEvent))
  .delete('/', ErrorHandle(Controller.deleteEvent))

export default router
