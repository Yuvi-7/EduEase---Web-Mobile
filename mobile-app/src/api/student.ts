import {
  STUDENT_STATS,
  STUDENT_SCHEDULE,
  STUDENT_TASKS,
  STUDENT_CLASSES,
  STUDENT_BADGES,
} from "@/mock/studentData";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const studentApi = {
  getStats: async () => {
    await delay(500);
    return STUDENT_STATS;
  },

  getSchedule: async () => {
    await delay(600);
    return STUDENT_SCHEDULE;
  },

  getTasks: async () => {
    await delay(700);
    return STUDENT_TASKS;
  },

  getClasses: async () => {
    await delay(650);
    return STUDENT_CLASSES;
  },

  getBadges: async () => {
    await delay(600);
    return STUDENT_BADGES;
  },
};
