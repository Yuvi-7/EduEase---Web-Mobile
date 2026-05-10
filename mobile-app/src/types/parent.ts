export type AttendanceDay =
  | "present"
  | "late"
  | "absent"
  | "off"
  | "future";

export interface ChildInfo {
  id: string;
  name: string;
  grade: string;
  studentId: string;
  avatarColor: string;
  checkInTime?: string;
  todayStatus: "present" | "late" | "absent";
}

export interface ParentStats {
  attendancePercent: number;
  avgGrade: string;
  feesDue: number;
  streak: number;
}

export interface ActivityFeedItem {
  id: string;
  type: "attendance" | "grade" | "message" | "fee" | "badge";
  description: string;
  time: string;
  icon: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  type: "meeting" | "fee" | "event";
  tone: "scholar" | "amber" | "coral" | "mint";
}

export interface CalendarDay {
  date: number;
  status: AttendanceDay;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  status: "present" | "late" | "absent";
  note?: string;
  checkIn?: string;
}

export interface FeeBreakdown {
  id: string;
  label: string;
  amount: number;
  paid: boolean;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  date: string;
  label: string;
}

export interface SubjectProgress {
  id: string;
  subject: string;
  score: number;
  maxScore: number;
  tone: "scholar" | "coral" | "mint" | "amber" | "rose";
}

export interface TeacherNote {
  teacherName: string;
  subject: string;
  note: string;
  date: string;
}

export interface ParentMessage {
  id: string;
  sender: string;
  role: string;
  preview: string;
  timestamp: string;
  unread: boolean;
}
