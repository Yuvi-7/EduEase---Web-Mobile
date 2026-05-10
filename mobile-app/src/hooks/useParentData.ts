import { useQuery } from "@tanstack/react-query";
import { parentApi } from "@/api/parent";

export const useChildInfo = () =>
  useQuery({ queryKey: ["parent", "child"], queryFn: parentApi.getChildInfo });

export const useParentStats = () =>
  useQuery({ queryKey: ["parent", "stats"], queryFn: parentApi.getStats });

export const useActivityFeed = () =>
  useQuery({ queryKey: ["parent", "activity"], queryFn: parentApi.getActivityFeed });

export const useUpcomingEvents = () =>
  useQuery({ queryKey: ["parent", "events"], queryFn: parentApi.getUpcomingEvents });

export const useAttendanceCalendar = () =>
  useQuery({ queryKey: ["parent", "calendar"], queryFn: parentApi.getCalendar });

export const useAttendanceRecords = () =>
  useQuery({ queryKey: ["parent", "attendanceRecords"], queryFn: parentApi.getAttendanceRecords });

export const useFeeBreakdown = () =>
  useQuery({ queryKey: ["parent", "fees"], queryFn: parentApi.getFeeBreakdown });

export const useRecentPayments = () =>
  useQuery({ queryKey: ["parent", "payments"], queryFn: parentApi.getRecentPayments });

export const useSubjectProgress = () =>
  useQuery({ queryKey: ["parent", "progress"], queryFn: parentApi.getSubjectProgress });

export const useTeacherNote = () =>
  useQuery({ queryKey: ["parent", "note"], queryFn: parentApi.getTeacherNote });

export const useParentMessages = () =>
  useQuery({ queryKey: ["parent", "messages"], queryFn: parentApi.getMessages });
