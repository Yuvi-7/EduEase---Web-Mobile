export type AttendanceStatus = "present" | "late" | "absent" | "unmarked";
export type ToneVariant = "scholar" | "coral" | "mint" | "amber" | "rose";

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  room: string;
  meta: string;
  tone: ToneVariant;
  status?: "ongoing" | "upcoming" | "done";
}

export interface Student {
  id: string;
  name: string;
  studentId: string;
  attendance?: AttendanceStatus;
  grade?: string;
  score?: number;
}

export interface AttendanceClass {
  id: string;
  subject: string;
  section: string;
  date: string;
  students: Student[];
  presentCount: number;
  lateCount: number;
  absentCount: number;
}

export interface ClassItem {
  id: string;
  subject: string;
  section: string;
  room: string;
  studentCount: number;
  nextClass: string;
  tone: ToneVariant;
  grade: string;
}

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  submittedCount: number;
  totalCount: number;
  tone: ToneVariant;
}

export interface Message {
  id: string;
  sender: string;
  role: string;
  preview: string;
  timestamp: string;
  unread: boolean;
}

export interface GradebookEntry {
  studentId: string;
  studentName: string;
  score: number | null;
  gradePill: string;
  pillTone: ToneVariant;
}
