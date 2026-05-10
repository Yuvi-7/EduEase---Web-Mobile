export type TaskStatus = "todo" | "submitted" | "graded";
export type SubjectTone = "scholar" | "coral" | "mint" | "amber" | "rose";

export interface StudentScheduleItem {
  id: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  tone: SubjectTone;
}

export interface Task {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  progress: number;
  status: TaskStatus;
  tone: SubjectTone;
}

export interface StudentClass {
  id: string;
  subject: string;
  teacher: string;
  grade: string;
  gradeTone: SubjectTone;
  tone: SubjectTone;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  required?: number;
}

export interface StudentStats {
  streak: number;
  attendancePercent: number;
  avgGrade: string;
  badgesEarned: number;
}
