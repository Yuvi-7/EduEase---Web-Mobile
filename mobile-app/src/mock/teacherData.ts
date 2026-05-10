import {
  ScheduleItem,
  ClassItem,
  Assignment,
  Message,
  AttendanceClass,
  GradebookEntry,
} from "@/types/teacher";

export const TEACHER_SCHEDULE: ScheduleItem[] = [
  { id: "1", time: "8:00 AM", title: "Mathematics – 9A", room: "Room 204", meta: "32 students", tone: "scholar", status: "done" },
  { id: "2", time: "9:30 AM", title: "Mathematics – 10B", room: "Room 204", meta: "28 students", tone: "coral", status: "ongoing" },
  { id: "3", time: "11:00 AM", title: "Algebra – 8C", room: "Lab 2", meta: "30 students", tone: "mint", status: "upcoming" },
  { id: "4", time: "1:00 PM", title: "Calculus – 11A", room: "Room 301", meta: "25 students", tone: "amber", status: "upcoming" },
  { id: "5", time: "2:30 PM", title: "Statistics – 12B", room: "Room 102", meta: "22 students", tone: "scholar", status: "upcoming" },
];

export const TEACHER_CLASSES: ClassItem[] = [
  { id: "1", subject: "Mathematics", section: "9A", room: "Room 204", studentCount: 32, nextClass: "Tomorrow, 8:00 AM", tone: "scholar", grade: "Grade 9" },
  { id: "2", subject: "Mathematics", section: "10B", room: "Room 204", studentCount: 28, nextClass: "Today, 9:30 AM", tone: "coral", grade: "Grade 10" },
  { id: "3", subject: "Algebra", section: "8C", room: "Lab 2", studentCount: 30, nextClass: "Today, 11:00 AM", tone: "mint", grade: "Grade 8" },
  { id: "4", subject: "Calculus", section: "11A", room: "Room 301", studentCount: 25, nextClass: "Today, 1:00 PM", tone: "amber", grade: "Grade 11" },
  { id: "5", subject: "Statistics", section: "12B", room: "Room 102", studentCount: 22, nextClass: "Today, 2:30 PM", tone: "scholar", grade: "Grade 12" },
];

export const TEACHER_ASSIGNMENTS: Assignment[] = [
  { id: "1", subject: "Math", title: "Chapter 5 – Quadratics", dueDate: "Due Tomorrow", submittedCount: 24, totalCount: 32, tone: "scholar" },
  { id: "2", subject: "Algebra", title: "Polynomial Expressions", dueDate: "Due in 3 days", submittedCount: 18, totalCount: 30, tone: "mint" },
  { id: "3", subject: "Calculus", title: "Limits & Derivatives", dueDate: "Due Friday", submittedCount: 10, totalCount: 25, tone: "amber" },
];

export const TEACHER_MESSAGES: Message[] = [
  { id: "1", sender: "Priya Mehta", role: "Parent · Arjun Mehta", preview: "Could you please share the test schedule for next week?", timestamp: "9:41 AM", unread: true },
  { id: "2", sender: "Principal Kapoor", role: "Admin", preview: "Staff meeting rescheduled to Thursday 2 PM.", timestamp: "Yesterday", unread: false },
  { id: "3", sender: "Rahul Sharma", role: "Parent · Kavya Sharma", preview: "Kavya was unwell last week, please excuse her absence.", timestamp: "Mon", unread: false },
  { id: "4", sender: "IT Department", role: "Admin", preview: "Gradebook system will be under maintenance on Sunday.", timestamp: "Sun", unread: false },
];

export const ATTENDANCE_CLASS: AttendanceClass = {
  id: "cls-9a",
  subject: "Mathematics",
  section: "9A",
  date: "Today",
  presentCount: 24,
  lateCount: 2,
  absentCount: 6,
  students: [
    { id: "s01", name: "Arjun Mehta", studentId: "STU-0912", attendance: "present" },
    { id: "s02", name: "Kavya Sharma", studentId: "STU-0913", attendance: "late" },
    { id: "s03", name: "Rohan Patel", studentId: "STU-0914", attendance: "absent" },
    { id: "s04", name: "Diya Nair", studentId: "STU-0915", attendance: "present" },
    { id: "s05", name: "Aditya Kumar", studentId: "STU-0916", attendance: "present" },
    { id: "s06", name: "Sneha Reddy", studentId: "STU-0917", attendance: "unmarked" },
    { id: "s07", name: "Vikram Singh", studentId: "STU-0918", attendance: "present" },
    { id: "s08", name: "Meera Joshi", studentId: "STU-0919", attendance: "absent" },
    { id: "s09", name: "Karthik Rao", studentId: "STU-0920", attendance: "present" },
    { id: "s10", name: "Ananya Gupta", studentId: "STU-0921", attendance: "present" },
    { id: "s11", name: "Harsh Verma", studentId: "STU-0922", attendance: "late" },
    { id: "s12", name: "Pooja Iyer", studentId: "STU-0923", attendance: "present" },
  ],
};

export const GRADEBOOK_ENTRIES: GradebookEntry[] = [
  { studentId: "s01", studentName: "Arjun Mehta", score: 88, gradePill: "B+", pillTone: "scholar" },
  { studentId: "s02", studentName: "Kavya Sharma", score: 95, gradePill: "A", pillTone: "mint" },
  { studentId: "s03", studentName: "Rohan Patel", score: 72, gradePill: "C+", pillTone: "amber" },
  { studentId: "s04", studentName: "Diya Nair", score: 91, gradePill: "A-", pillTone: "mint" },
  { studentId: "s05", studentName: "Aditya Kumar", score: 65, gradePill: "D+", pillTone: "rose" },
  { studentId: "s06", studentName: "Sneha Reddy", score: 83, gradePill: "B", pillTone: "scholar" },
  { studentId: "s07", studentName: "Vikram Singh", score: 78, gradePill: "B-", pillTone: "coral" },
  { studentId: "s08", studentName: "Meera Joshi", score: null, gradePill: "–", pillTone: "neutral" as any },
];
