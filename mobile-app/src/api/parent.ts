import {
  CHILD_INFO,
  PARENT_STATS,
  ACTIVITY_FEED,
  UPCOMING_EVENTS,
  MAY_CALENDAR,
  ATTENDANCE_RECORDS,
  FEE_BREAKDOWN,
  RECENT_PAYMENTS,
  SUBJECT_PROGRESS,
  TEACHER_NOTE,
  PARENT_MESSAGES,
} from "@/mock/parentData";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const parentApi = {
  getChildInfo: async () => {
    await delay(500);
    return CHILD_INFO;
  },

  getStats: async () => {
    await delay(600);
    return PARENT_STATS;
  },

  getActivityFeed: async () => {
    await delay(500);
    return ACTIVITY_FEED;
  },

  getUpcomingEvents: async () => {
    await delay(550);
    return UPCOMING_EVENTS;
  },

  getCalendar: async () => {
    await delay(700);
    return MAY_CALENDAR;
  },

  getAttendanceRecords: async () => {
    await delay(650);
    return ATTENDANCE_RECORDS;
  },

  getFeeBreakdown: async () => {
    await delay(600);
    return FEE_BREAKDOWN;
  },

  getRecentPayments: async () => {
    await delay(500);
    return RECENT_PAYMENTS;
  },

  getSubjectProgress: async () => {
    await delay(700);
    return SUBJECT_PROGRESS;
  },

  getTeacherNote: async () => {
    await delay(500);
    return TEACHER_NOTE;
  },

  getMessages: async () => {
    await delay(600);
    return PARENT_MESSAGES;
  },
};
