import { Router } from 'express'
import { authenticate } from '../../shared/middleware/authenticate'
import { validate } from '../../shared/middleware/validate'
import { createMessageDto, listMessagesDto } from './messages.dto'
import * as messagesController from './messages.controller'

export const messagesRouter = Router()

messagesRouter.use(authenticate)

messagesRouter.get('/', validate(listMessagesDto, 'query'), messagesController.list)
messagesRouter.post('/', validate(createMessageDto), messagesController.create)
messagesRouter.patch('/:id/read', messagesController.markAsRead)
