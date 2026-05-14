import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const SALT_ROUNDS = 12

async function hash(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS)
}

async function main() {
  console.log('Seeding database...')

  // ─── Clean existing data ──────────────────────────────────────────────────
  await prisma.parentStudent.deleteMany()
  await prisma.attendance.deleteMany()
  await prisma.timetableEntry.deleteMany()
  await prisma.fee.deleteMany()
  await prisma.message.deleteMany()
  await prisma.refreshToken.deleteMany()
  await prisma.student.deleteMany()
  await prisma.teacher.deleteMany()
  await prisma.parent.deleteMany()
  await prisma.classSection.deleteMany()
  await prisma.user.deleteMany()
  await prisma.school.deleteMany()

  // ─── Schools ──────────────────────────────────────────────────────────────
  const lakeside = await prisma.school.create({
    data: { code: 'EDU001', name: 'Lakeside Academy', city: 'Pune', plan: 'SCALE' },
  })

  const greenfield = await prisma.school.create({
    data: { code: 'EDU002', name: 'Greenfield International', city: 'Bengaluru', plan: 'GROWTH' },
  })

  // ─── Super Admin ──────────────────────────────────────────────────────────
  await prisma.user.create({
    data: {
      name: 'Neha Kapoor',
      email: 'neha@eduease.com',
      passwordHash: await hash('super123'),
      role: 'SUPER_ADMIN',
      schoolId: null,
    },
  })

  // ─── School Admin — Lakeside ──────────────────────────────────────────────
  await prisma.user.create({
    data: {
      name: 'Maya Sharma',
      email: 'maya@lakeside.edu',
      passwordHash: await hash('admin123'),
      role: 'SCHOOL_ADMIN',
      schoolId: lakeside.id,
    },
  })

  // ─── Teacher — Lakeside ───────────────────────────────────────────────────
  const teacherUser = await prisma.user.create({
    data: {
      name: 'Anita Desai',
      email: 'anita@lakeside.edu',
      passwordHash: await hash('teacher123'),
      role: 'TEACHER',
      schoolId: lakeside.id,
    },
  })

  const teacher = await prisma.teacher.create({
    data: {
      schoolId: lakeside.id,
      userId: teacherUser.id,
      subject: 'Mathematics',
      load: 24,
      status: 'ACTIVE',
    },
  })

  const teacher2User = await prisma.user.create({
    data: {
      name: 'Raj Patel',
      email: 'raj@lakeside.edu',
      passwordHash: await hash('teacher123'),
      role: 'TEACHER',
      schoolId: lakeside.id,
    },
  })

  await prisma.teacher.create({
    data: {
      schoolId: lakeside.id,
      userId: teacher2User.id,
      subject: 'Science',
      load: 20,
      status: 'ACTIVE',
    },
  })

  // ─── Classes — Lakeside ───────────────────────────────────────────────────
  const class5A = await prisma.classSection.create({
    data: { schoolId: lakeside.id, teacherId: teacher.id, grade: 5, section: 'A', room: 'R-201' },
  })

  const class6A = await prisma.classSection.create({
    data: { schoolId: lakeside.id, grade: 6, section: 'A', room: 'R-202' },
  })

  await prisma.classSection.create({
    data: { schoolId: lakeside.id, grade: 7, section: 'A', room: 'R-301' },
  })

  // ─── Students — Lakeside ──────────────────────────────────────────────────
  const studentUsers = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Arjun Mehta',
        email: 'arjun@lakeside.edu',
        passwordHash: await hash('student123'),
        role: 'STUDENT',
        schoolId: lakeside.id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Priya Singh',
        email: 'priya@lakeside.edu',
        passwordHash: await hash('student123'),
        role: 'STUDENT',
        schoolId: lakeside.id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Vikram Joshi',
        email: 'vikram@lakeside.edu',
        passwordHash: await hash('student123'),
        role: 'STUDENT',
        schoolId: lakeside.id,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Aisha Khan',
        email: 'aisha@lakeside.edu',
        passwordHash: await hash('student123'),
        role: 'STUDENT',
        schoolId: lakeside.id,
      },
    }),
  ])

  const students = await Promise.all([
    prisma.student.create({
      data: { schoolId: lakeside.id, userId: studentUsers[0].id, grade: '5A' },
    }),
    prisma.student.create({
      data: { schoolId: lakeside.id, userId: studentUsers[1].id, grade: '5A' },
    }),
    prisma.student.create({
      data: { schoolId: lakeside.id, userId: studentUsers[2].id, grade: '6A' },
    }),
    prisma.student.create({
      data: { schoolId: lakeside.id, userId: studentUsers[3].id, grade: '6A' },
    }),
  ])

  // ─── Parents — Lakeside ───────────────────────────────────────────────────
  const parentUser = await prisma.user.create({
    data: {
      name: 'Sunita Mehta',
      email: 'sunita@gmail.com',
      passwordHash: await hash('parent123'),
      role: 'PARENT',
      schoolId: lakeside.id,
    },
  })

  const parent = await prisma.parent.create({
    data: { schoolId: lakeside.id, userId: parentUser.id },
  })

  await prisma.parentStudent.create({
    data: { parentId: parent.id, studentId: students[0].id },
  })

  // ─── Fees — Lakeside ─────────────────────────────────────────────────────
  await prisma.fee.createMany({
    data: [
      {
        schoolId: lakeside.id,
        studentId: students[0].id,
        amount: 25000,
        dueDate: new Date('2025-03-01'),
        paidDate: new Date('2025-02-28'),
        status: 'PAID',
        label: 'Term 1 Tuition',
      },
      {
        schoolId: lakeside.id,
        studentId: students[0].id,
        amount: 25000,
        dueDate: new Date('2025-06-01'),
        status: 'DUE',
        label: 'Term 2 Tuition',
      },
      {
        schoolId: lakeside.id,
        studentId: students[1].id,
        amount: 25000,
        dueDate: new Date('2025-03-01'),
        status: 'OVERDUE',
        label: 'Term 1 Tuition',
      },
      {
        schoolId: lakeside.id,
        studentId: students[2].id,
        amount: 28000,
        dueDate: new Date('2025-03-01'),
        paidDate: new Date('2025-03-15'),
        status: 'PAID',
        label: 'Term 1 Tuition',
      },
    ],
  })

  // ─── Attendance — Lakeside ────────────────────────────────────────────────
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  await prisma.attendance.createMany({
    data: [
      { schoolId: lakeside.id, classId: class5A.id, studentId: students[0].id, date: today, status: 'PRESENT' },
      { schoolId: lakeside.id, classId: class5A.id, studentId: students[1].id, date: today, status: 'ABSENT' },
      { schoolId: lakeside.id, classId: class6A.id, studentId: students[2].id, date: today, status: 'PRESENT' },
      { schoolId: lakeside.id, classId: class6A.id, studentId: students[3].id, date: today, status: 'LATE' },
    ],
  })

  // ─── Timetable — Lakeside ────────────────────────────────────────────────
  await prisma.timetableEntry.createMany({
    data: [
      { schoolId: lakeside.id, classId: class5A.id, teacherId: teacher.id, day: 0, slot: 1, subject: 'Mathematics', room: 'R-201' },
      { schoolId: lakeside.id, classId: class5A.id, teacherId: teacher.id, day: 0, slot: 2, subject: 'Mathematics', room: 'R-201' },
      { schoolId: lakeside.id, classId: class5A.id, teacherId: teacher.id, day: 1, slot: 1, subject: 'Mathematics', room: 'R-201' },
      { schoolId: lakeside.id, classId: class5A.id, teacherId: teacher.id, day: 2, slot: 3, subject: 'Mathematics', room: 'R-201' },
    ],
  })

  // ─── Messages — Lakeside ──────────────────────────────────────────────────
  await prisma.message.createMany({
    data: [
      { schoolId: lakeside.id, fromId: parentUser.id, toId: teacherUser.id, body: 'Hi, can we schedule a parent-teacher meeting?', unread: true },
      { schoolId: lakeside.id, fromId: teacherUser.id, toId: parentUser.id, body: 'Of course! How about this Friday at 3 PM?', unread: true },
      { schoolId: lakeside.id, fromId: teacherUser.id, body: 'Reminder: Math test on Monday. Please revise chapters 5-8.', unread: false },
    ],
  })

  // ─── Greenfield School Admin ──────────────────────────────────────────────
  await prisma.user.create({
    data: {
      name: 'Kavita Reddy',
      email: 'kavita@greenfield.edu',
      passwordHash: await hash('admin123'),
      role: 'SCHOOL_ADMIN',
      schoolId: greenfield.id,
    },
  })

  console.log('Seeding complete!')
  console.log('')
  console.log('Demo credentials:')
  console.log('  Super Admin  : neha@eduease.com     / super123')
  console.log('  School Admin : maya@lakeside.edu     / admin123')
  console.log('  Teacher      : anita@lakeside.edu    / teacher123')
  console.log('  Student      : arjun@lakeside.edu    / student123  (schoolCode: EDU001)')
  console.log('  Parent       : sunita@gmail.com      / parent123   (schoolCode: EDU001)')
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
