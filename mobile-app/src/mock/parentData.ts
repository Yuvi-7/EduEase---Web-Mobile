import {
  ChildInfo,
  ParentStats,
  ActivityFeedItem,
  UpcomingEvent,
  CalendarDay,
  AttendanceRecord,
  FeeBreakdown,
  Payment,
  SubjectProgress,
  TeacherNote,
  ParentMessage,
} from "@/types/parent";

export const CHILD_INFO: ChildInfo = {
  id: "student-001",
  name: "Arjun Mehta",
  grade: "Grade 9 – Section A",
  studentId: "STU-2024-0912",
  avatarColor: "#5B5BE5",
  checkInTime: "7:58 AM",
  todayStatus: "present",
};

export const PARENT_STATS: ParentStats = {
  attendancePercent: 94,
  avgGrade: "A-",
  feesDue: 12500,
  streak: 12,
};

export const ACTIVITY_FEED: ActivityFeedItem[] = [
  { id: "1", type: "attendance", description: "Marked present at 7:58 AM", time: "Today", icon: "check-circle" },
  { id: "2", type: "grade", description: "Scored 88/100 in Math Quiz 3", time: "Yesterday", icon: "star" },
  { id: "3", type: "message", description: "New message from Ms. Chen", time: "2 days ago", icon: "message-circle" },
];

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  { id: "1", title: "Parent-Teacher Meeting", date: "May 15, 2026", type: "meeting", tone: "scholar" },
  { id: "2", title: "Term 2 Fees Due", date: "May 20, 2026", type: "fee", tone: "amber" },
  { id: "3", title: "Annual Sports Day", date: "May 25, 2026", type: "event", tone: "mint" },
];

// May 2026 calendar (1–31)
export const MAY_CALENDAR: CalendarDay[] = [
  { date: 1, status: "present" }, { date: 2, status: "present" }, { date: 3, status: "off" },
  { date: 4, status: "off" }, { date: 5, status: "present" }, { date: 6, status: "present" },
  { date: 7, status: "present" }, { date: 8, status: "late" }, { date: 9, status: "present" },
  { date: 10, status: "present" }, { date: 11, status: "off" }, { date: 12, status: "off" },
  { date: 13, status: "present" }, { date: 14, status: "present" }, { date: 15, status: "absent" },
  { date: 16, status: "present" }, { date: 17, status: "off" }, { date: 18, status: "off" },
  { date: 19, status: "present" }, { date: 20, status: "present" }, { date: 21, status: "present" },
  { date: 22, status: "present" }, { date: 23, status: "present" }, { date: 24, status: "off" },
  { date: 25, status: "off" }, { date: 26, status: "present" }, { date: 27, status: "present" },
  { date: 28, status: "present" }, { date: 29, status: "present" }, { date: 30, status: "present" },
  { date: 31, status: "future" },
];

export const ATTENDANCE_RECORDS: AttendanceRecord[] = [
  { id: "1", date: "May 10, 2026", status: "present", checkIn: "7:58 AM" },
  { id: "2", date: "May 9, 2026", status: "present", checkIn: "8:02 AM" },
  { id: "3", date: "May 8, 2026", status: "late", checkIn: "8:45 AM", note: "Bus delay" },
  { id: "4", date: "May 7, 2026", status: "present", checkIn: "7:55 AM" },
  { id: "5", date: "May 15, 2026", status: "absent", note: "Medical leave" },
];

export const FEE_BREAKDOWN: FeeBreakdown[] = [
  { id: "1", label: "Tuition Fee", amount: 8000, paid: false },
  { id: "2", label: "Transport Fee", amount: 2000, paid: false },
  { id: "3", label: "Activities Fee", amount: 1500, paid: false },
  { id: "4", label: "Lab Fee", amount: 1000, paid: false },
];

export const RECENT_PAYMENTS: Payment[] = [
  { id: "1", invoiceId: "INV-2026-0341", amount: 12500, date: "Jan 10, 2026", label: "Term 1 Fee" },
  { id: "2", invoiceId: "INV-2025-0892", amount: 12500, date: "Sep 5, 2025", label: "Term 0 Fee" },
];

export const SUBJECT_PROGRESS: SubjectProgress[] = [
  { id: "1", subject: "Mathematics", score: 88, maxScore: 100, tone: "scholar" },
  { id: "2", subject: "Science", score: 82, maxScore: 100, tone: "mint" },
  { id: "3", subject: "English", score: 95, maxScore: 100, tone: "coral" },
  { id: "4", subject: "History", score: 79, maxScore: 100, tone: "amber" },
  { id: "5", subject: "Computer Science", score: 92, maxScore: 100, tone: "scholar" },
  { id: "6", subject: "Physical Education", score: 90, maxScore: 100, tone: "mint" },
];

export const TEACHER_NOTE: TeacherNote = {
  teacherName: "Ms. Sarah Chen",
  subject: "Mathematics",
  note: "Arjun has shown great improvement in algebra. Encourage him to practice more word problems to strengthen his analytical skills.",
  date: "May 8, 2026",
};

export const PARENT_MESSAGES: ParentMessage[] = [
  { id: "1", sender: "Ms. Sarah Chen", role: "Mathematics Teacher", preview: "Arjun did exceptionally well in today's quiz!", timestamp: "9:41 AM", unread: true },
  { id: "2", sender: "Principal Kapoor", role: "Admin", preview: "PTM is scheduled for May 15. Please confirm attendance.", timestamp: "Yesterday", unread: false },
  { id: "3", sender: "Mr. Rashid Khan", role: "History Teacher", preview: "Arjun's WW2 project has been graded. Check progress.", timestamp: "Mon", unread: false },
  { id: "4", sender: "School Admin", role: "Finance", preview: "Term 2 fees are due on May 20. Kindly make payment.", timestamp: "Sun", unread: false },
];
