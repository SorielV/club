import Controller from './calendar.controller'
import { Router } from 'express'

import { 
  ErrorHandle,
  HandleAuth,
  isAuth,
  isAdmin,
  isMember
} from './../../../../middleware'

const router = Router()

router
  .use(HandleAuth) // Optional Auth
  .get('/', ErrorHandle(Controller.getCalendar))
  .get('/:id', ErrorHandle(Controller.getCalendar))

export default router
