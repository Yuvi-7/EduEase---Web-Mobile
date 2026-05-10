import { StudentScheduleItem, Task, StudentClass, Badge, StudentStats } from "@/types/student";

export const STUDENT_STATS: StudentStats = {
  streak: 12,
  attendancePercent: 94,
  avgGrade: "A-",
  badgesEarned: 4,
};

export const STUDENT_SCHEDULE: StudentScheduleItem[] = [
  { id: "1", time: "8:00 AM", subject: "Mathematics", teacher: "Ms. Chen", room: "Room 204", tone: "scholar" },
  { id: "2", time: "9:30 AM", subject: "Science", teacher: "Mr. Iyer", room: "Lab 1", tone: "mint" },
  { id: "3", time: "11:00 AM", subject: "English", teacher: "Ms. D'Souza", room: "Room 108", tone: "coral" },
  { id: "4", time: "1:00 PM", subject: "History", teacher: "Mr. Khan", room: "Room 210", tone: "amber" },
  { id: "5", time: "2:30 PM", subject: "Computer Science", teacher: "Ms. Pillai", room: "Lab 3", tone: "purple" as any },
];

export const STUDENT_TASKS: Task[] = [
  { id: "1", subject: "Math", title: "Chapter 5 – Quadratics", dueDate: "Due Tomorrow", progress: 0.6, status: "todo", tone: "scholar" },
  { id: "2", subject: "Science", title: "Photosynthesis Lab Report", dueDate: "Due in 3 days", progress: 0.3, status: "todo", tone: "mint" },
  { id: "3", subject: "English", title: "Shakespeare Essay", dueDate: "Due Friday", progress: 0.8, status: "todo", tone: "coral" },
  { id: "4", subject: "History", title: "WW2 Timeline", dueDate: "Due Monday", progress: 0.0, status: "todo", tone: "amber" },
  { id: "5", subject: "Math", title: "Algebra Practice Set", dueDate: "Submitted 2 days ago", progress: 1, status: "submitted", tone: "scholar" },
  { id: "6", subject: "CS", title: "Python Functions", dueDate: "Graded – 92/100", progress: 1, status: "graded", tone: "rose" },
];

export const STUDENT_CLASSES: StudentClass[] = [
  { id: "1", subject: "Mathematics", teacher: "Ms. Sarah Chen", grade: "A-", gradeTone: "scholar", tone: "scholar" },
  { id: "2", subject: "Science", teacher: "Mr. Arun Iyer", grade: "B+", gradeTone: "coral", tone: "mint" },
  { id: "3", subject: "English", teacher: "Ms. Maria D'Souza", grade: "A", gradeTone: "mint", tone: "coral" },
  { id: "4", subject: "History", teacher: "Mr. Rashid Khan", grade: "B", gradeTone: "coral", tone: "amber" },
  { id: "5", subject: "Computer Science", teacher: "Ms. Lakshmi Pillai", grade: "A+", gradeTone: "mint", tone: "scholar" },
  { id: "6", subject: "Physical Education", teacher: "Mr. Suresh Nair", grade: "A", gradeTone: "mint", tone: "rose" },
];

export const STUDENT_BADGES: Badge[] = [
  { id: "1", title: "Streak Master", description: "12 days in a row!", emoji: "🔥", earned: true, earnedDate: "May 8, 2026" },
  { id: "2", title: "Top Scorer", description: "Scored 95+ in a test", emoji: "⭐", earned: true, earnedDate: "Apr 22, 2026" },
  { id: "3", title: "Early Bird", description: "On time for 10 days", emoji: "🌅", earned: true, earnedDate: "Apr 10, 2026" },
  { id: "4", title: "Homework Hero", description: "All tasks submitted on time", emoji: "📚", earned: true, earnedDate: "Mar 30, 2026" },
  { id: "5", title: "Perfect Week", description: "100% attendance for a week", emoji: "🏆", earned: false, progress: 5, required: 7 },
  { id: "6", title: "Speed Reader", description: "Complete 3 book reports", emoji: "📖", earned: false, progress: 2, required: 3 },
  { id: "7", title: "Math Wizard", description: "Score A+ in 3 math tests", emoji: "🧮", earned: false, progress: 2, required: 3 },
];
