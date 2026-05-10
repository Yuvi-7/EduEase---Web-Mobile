import {
  TEACHER_SCHEDULE,
  TEACHER_CLASSES,
  TEACHER_ASSIGNMENTS,
  TEACHER_MESSAGES,
  ATTENDANCE_CLASS,
  GRADEBOOK_ENTRIES,
} from "@/mock/teacherData";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const teacherApi = {
  getSchedule: async () => {
    await delay(600);
    return TEACHER_SCHEDULE;
  },

  getClasses: async () => {
    await delay(700);
    return TEACHER_CLASSES;
  },

  getAssignments: async () => {
    await delay(500);
    return TEACHER_ASSIGNMENTS;
  },

  getMessages: async () => {
    await delay(600);
    return TEACHER_MESSAGES;
  },

  getAttendanceClass: async (classId?: string) => {
    await delay(800);
    return ATTENDANCE_CLASS;
  },

  getGradebook: async (classId?: string) => {
    await delay(700);
    return GRADEBOOK_ENTRIES;
  },

  saveAttendance: async (classId: string, records: Record<string, string>) => {
    await delay(1000);
    return { success: true };
  },
};
