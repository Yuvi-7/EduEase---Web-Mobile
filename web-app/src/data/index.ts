import type { Student, Teacher, ClassSection, Invoice, MessageThread, School, Parent } from '@/types'

export const STUDENTS: Student[] = [
  { id: 'STU-00248-K', name: 'Aanya Kapoor',  grade: '4A', guardian: 'Riya Kapoor',   fees: 'paid',    attendance: 96,  status: 'active' },
  { id: 'STU-00251-M', name: 'Rohan Mehta',   grade: '4A', guardian: 'Nikhil Mehta',  fees: 'due',     attendance: 89,  status: 'active' },
  { id: 'STU-00253-P', name: 'Sara Patel',    grade: '4A', guardian: 'Anita Patel',   fees: 'paid',    attendance: 78,  status: 'active' },
  { id: 'STU-00261-S', name: 'Ishaan Sharma', grade: '4B', guardian: 'Vivek Sharma',  fees: 'paid',    attendance: 100, status: 'active' },
  { id: 'STU-00264-R', name: 'Diya Reddy',    grade: '4B', guardian: 'Kiran Reddy',   fees: 'overdue', attendance: 92,  status: 'active' },
  { id: 'STU-00271-N', name: 'Arjun Nair',    grade: '5A', guardian: 'Latha Nair',    fees: 'paid',    attendance: 95,  status: 'active' },
  { id: 'STU-00275-J', name: 'Meera Joshi',   grade: '5A', guardian: 'Pooja Joshi',   fees: 'paid',    attendance: 88,  status: 'active' },
  { id: 'STU-00282-V', name: 'Karan Verma',   grade: '5B', guardian: 'Sanjay Verma',  fees: 'due',     attendance: 84,  status: 'active' },
  { id: 'STU-00289-G', name: 'Aisha Gupta',   grade: '6A', guardian: 'Rekha Gupta',   fees: 'paid',    attendance: 99,  status: 'active' },
  { id: 'STU-00294-D', name: 'Vikram Desai',  grade: '6A', guardian: 'Manoj Desai',   fees: 'paid',    attendance: 91,  status: 'active' },
]

export const TEACHERS: Teacher[] = [
  { id: 'TCH-014', name: 'Anita Rao',      subj: 'Mathematics',   classes: '4A · 5A · 5B', email: 'anita.rao@lakeside.edu',  status: 'active', load: 24 },
  { id: 'TCH-021', name: 'Ravi Iyer',      subj: 'Science',       classes: '6A · 6B · 7A', email: 'ravi.iyer@lakeside.edu',  status: 'active', load: 22 },
  { id: 'TCH-026', name: 'Priya Banerjee', subj: 'English',       classes: '4A · 4B · 5A', email: 'priya.b@lakeside.edu',    status: 'active', load: 20 },
  { id: 'TCH-031', name: 'Sandeep Khanna', subj: 'Social Studies', classes: '7A · 7B · 8A', email: 'sandeep.k@lakeside.edu', status: 'leave',  load: 0  },
  { id: 'TCH-036', name: 'Latha Nair',     subj: 'Hindi',         classes: '5A · 5B · 6A', email: 'latha.n@lakeside.edu',    status: 'active', load: 18 },
  { id: 'TCH-041', name: 'Manoj Desai',    subj: 'Physical Ed',   classes: 'All grades',   email: 'manoj.d@lakeside.edu',    status: 'active', load: 16 },
  { id: 'TCH-045', name: 'Kiran Reddy',    subj: 'Computer Sci',  classes: '8A · 9A · 10A',email: 'kiran.r@lakeside.edu',   status: 'active', load: 21 },
  { id: 'TCH-049', name: 'Rekha Gupta',    subj: 'Art & Music',   classes: '4A–8B',        email: 'rekha.g@lakeside.edu',    status: 'active', load: 14 },
]

export const CLASSES: ClassSection[] = [
  { id: '4A',  grade: 4,  students: 32, teacher: 'Anita Rao',      room: '201', avgGrade: 'A−', attendance: 94 },
  { id: '4B',  grade: 4,  students: 30, teacher: 'Priya Banerjee', room: '203', avgGrade: 'B+', attendance: 91 },
  { id: '5A',  grade: 5,  students: 34, teacher: 'Latha Nair',     room: '204', avgGrade: 'A',  attendance: 96 },
  { id: '5B',  grade: 5,  students: 31, teacher: 'Anita Rao',      room: '206', avgGrade: 'B+', attendance: 89 },
  { id: '6A',  grade: 6,  students: 33, teacher: 'Ravi Iyer',      room: '301', avgGrade: 'A−', attendance: 93 },
  { id: '7A',  grade: 7,  students: 30, teacher: 'Sandeep Khanna', room: '305', avgGrade: 'B',  attendance: 88 },
  { id: '8A',  grade: 8,  students: 28, teacher: 'Kiran Reddy',    room: '401', avgGrade: 'A−', attendance: 92 },
  { id: '10A', grade: 10, students: 26, teacher: 'Kiran Reddy',    room: '404', avgGrade: 'A',  attendance: 95 },
]

export const INVOICES: Invoice[] = [
  { id: 'INV-2426-0918', student: 'Aanya Kapoor',  grade: '4A', amt: 42000, due: '15 May', status: 'paid',    paid: '8 May'  },
  { id: 'INV-2426-0921', student: 'Rohan Mehta',   grade: '4A', amt: 42000, due: '15 May', status: 'due',     paid: '—'       },
  { id: 'INV-2426-0930', student: 'Diya Reddy',    grade: '4B', amt: 42000, due: '15 May', status: 'overdue', paid: '—'       },
  { id: 'INV-2426-0942', student: 'Karan Verma',   grade: '5B', amt: 46500, due: '15 May', status: 'partial', paid: '25 Apr'  },
  { id: 'INV-2426-0958', student: 'Ishaan Sharma', grade: '4B', amt: 42000, due: '15 May', status: 'paid',    paid: '2 May'   },
  { id: 'INV-2426-0968', student: 'Aisha Gupta',   grade: '6A', amt: 48000, due: '15 May', status: 'paid',    paid: '9 May'   },
  { id: 'INV-2426-0975', student: 'Vikram Desai',  grade: '6A', amt: 48000, due: '15 May', status: 'paid',    paid: '7 May'   },
]

export const THREADS: MessageThread[] = [
  { id: 1, from: 'Riya Kapoor',  role: 'Parent · Aanya 4A',  preview: 'Thanks for the swift response on the field-trip permission slip…', t: '9:41', unread: false, color: '#5B5BE5' },
  { id: 2, from: 'Anita Rao',   role: 'Teacher · Math',     preview: 'Could we move the parent-teacher meet to Friday? Have a clinic on…', t: '8:52', unread: true,  color: '#FF8A6A' },
  { id: 3, from: 'Vivek Sharma',role: 'Parent · Ishaan 4B', preview: 'Ishaan will be travelling for a family wedding. Marking him absent…', t: 'Yest', unread: true,  color: '#2DBA73' },
  { id: 4, from: 'Latha Nair',  role: 'Teacher · Hindi',    preview: 'Sharing the term-2 reading list. Please review and approve.',       t: 'Yest', unread: false, color: '#F0A52A' },
  { id: 5, from: 'Operations',  role: 'System',             preview: 'Reminder: Fee deadline is 15 May. 34 invoices outstanding.',        t: 'Mon',  unread: false, color: '#8C5BD6' },
  { id: 6, from: 'Manoj Desai', role: 'Teacher · PE',       preview: 'Sports day venue is finalised — Indira Stadium, 6 June.',          t: 'Mon',  unread: false, color: '#3F8FE0' },
]

export const SCHOOLS: School[] = [
  { name: 'Lakeside Academy',     city: 'Pune',      students: 1256, teachers: 84,  attend: 94.2, fee: 89, plan: 'Scale',   tone: 'mint',  trend: [35,42,38,55,62,58,70] },
  { name: 'Springfield Intl',     city: 'Bengaluru', students: 2104, teachers: 138, attend: 91.8, fee: 92, plan: 'Scale',   tone: 'mint',  trend: [40,45,48,52,60,68,72] },
  { name: 'Rosewood High',        city: 'Mumbai',    students: 1842, teachers: 121, attend: 88.4, fee: 74, plan: 'Growth',  tone: 'amber', trend: [55,52,48,46,40,38,42] },
  { name: 'Cedar Ridge School',   city: 'Hyderabad', students: 986,  teachers: 62,  attend: 95.1, fee: 96, plan: 'Growth',  tone: 'mint',  trend: [28,34,42,50,55,64,72] },
  { name: 'Brookfield Public',    city: 'Chennai',   students: 1432, teachers: 96,  attend: 92.6, fee: 81, plan: 'Scale',   tone: 'mint',  trend: [44,48,50,46,52,58,62] },
  { name: 'Hillcrest Day',        city: 'Delhi',     students: 744,  teachers: 48,  attend: 86.3, fee: 68, plan: 'Growth',  tone: 'rose',  trend: [60,55,50,42,38,35,30] },
  { name: 'Riverstone College',   city: 'Kolkata',   students: 1618, teachers: 108, attend: 90.7, fee: 83, plan: 'Scale',   tone: 'mint',  trend: [50,52,55,58,60,62,66] },
  { name: 'Pinegrove Montessori', city: 'Goa',       students: 312,  teachers: 24,  attend: 97.8, fee: 99, plan: 'Starter', tone: 'mint',  trend: [42,48,54,60,66,70,76] },
]

export const PARENTS: Parent[] = [
  { name: 'Riya Kapoor',  linked: 'Aanya · 4A',             email: 'riya.k@gmail.com',   status: 'Active'  },
  { name: 'Nikhil Mehta', linked: 'Rohan · 4A',             email: 'nikhil.m@gmail.com', status: 'Active'  },
  { name: 'Vivek Sharma', linked: 'Ishaan · 4B',            email: 'vivek.s@gmail.com',  status: 'Active'  },
  { name: 'Sanjay Verma', linked: 'Karan · 5B',             email: 's.verma@gmail.com',  status: 'Pending' },
  { name: 'Manoj Desai',  linked: 'Vikram · 6A',            email: 'manoj.d@gmail.com',  status: 'Active'  },
  { name: 'Latha Nair',   linked: 'Arjun · 5A · Meera (alum)', email: 'latha.n@gmail.com', status: 'Active' },
]
