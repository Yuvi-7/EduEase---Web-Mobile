import { Router } from 'express'
import { authRouter } from '../modules/auth/auth.routes'
import { usersRouter } from '../modules/users/users.routes'
import { schoolsRouter } from '../modules/schools/schools.routes'
import { studentsRouter } from '../modules/students/students.routes'
import { teachersRouter } from '../modules/teachers/teachers.routes'
import { parentsRouter } from '../modules/parents/parents.routes'
import { classesRouter } from '../modules/classes/classes.routes'
import { attendanceRouter } from '../modules/attendance/attendance.routes'
import { feesRouter } from '../modules/fees/fees.routes'
import { messagesRouter } from '../modules/messages/messages.routes'
import { timetableRouter } from '../modules/timetable/timetable.routes'

export const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/schools', schoolsRouter)
apiRouter.use('/students', studentsRouter)
apiRouter.use('/teachers', teachersRouter)
apiRouter.use('/parents', parentsRouter)
apiRouter.use('/classes', classesRouter)
apiRouter.use('/attendance', attendanceRouter)
apiRouter.use('/fees', feesRouter)
apiRouter.use('/messages', messagesRouter)
apiRouter.use('/timetable', timetableRouter)
