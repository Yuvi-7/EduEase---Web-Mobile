import { useQuery } from "@tanstack/react-query";
import { studentApi } from "@/api/student";

export const useStudentStats = () =>
  useQuery({ queryKey: ["student", "stats"], queryFn: studentApi.getStats });

export const useStudentSchedule = () =>
  useQuery({ queryKey: ["student", "schedule"], queryFn: studentApi.getSchedule });

export const useStudentTasks = () =>
  useQuery({ queryKey: ["student", "tasks"], queryFn: studentApi.getTasks });

export const useStudentClasses = () =>
  useQuery({ queryKey: ["student", "classes"], queryFn: studentApi.getClasses });

export const useStudentBadges = () =>
  useQuery({ queryKey: ["student", "badges"], queryFn: studentApi.getBadges });
