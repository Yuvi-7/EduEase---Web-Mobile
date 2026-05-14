import { buildMeta } from '../../shared/utils/pagination'
import { attendanceRepository } from './attendance.repository'
import type { BulkAttendanceInput, ListAttendanceInput } from './attendance.dto'
import type { AttendanceStatus } from '@prisma/client'

export const attendanceService = {
  async list(schoolId: string, filters: ListAttendanceInput) {
    const [records, total] = await Promise.all([
      attendanceRepository.findMany(schoolId, filters),
      attendanceRepository.count(schoolId, {
        classId: filters.classId,
        studentId: filters.studentId,
        date: filters.date,
      }),
    ])
    return { attendance: records, meta: buildMeta(filters.page, filters.limit, total) }
  },

  async markBulk(schoolId: string, data: BulkAttendanceInput) {
    const date = new Date(data.date)
    return attendanceRepository.bulkUpsert(
      schoolId,
      data.classId,
      date,
      data.entries as { studentId: string; status: AttendanceStatus }[],
    )
  },

  async update(id: string, status: AttendanceStatus) {
    return attendanceRepository.update(id, status)
  },
}
