import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { teacherApi } from "@/api/teacher";

export const useTeacherSchedule = () =>
  useQuery({ queryKey: ["teacher", "schedule"], queryFn: teacherApi.getSchedule });

export const useTeacherClasses = () =>
  useQuery({ queryKey: ["teacher", "classes"], queryFn: teacherApi.getClasses });

export const useTeacherAssignments = () =>
  useQuery({ queryKey: ["teacher", "assignments"], queryFn: teacherApi.getAssignments });

export const useTeacherMessages = () =>
  useQuery({ queryKey: ["teacher", "messages"], queryFn: teacherApi.getMessages });

export const useAttendanceClass = (classId?: string) =>
  useQuery({ queryKey: ["teacher", "attendance", classId], queryFn: () => teacherApi.getAttendanceClass(classId) });

export const useGradebook = (classId?: string) =>
  useQuery({ queryKey: ["teacher", "gradebook", classId], queryFn: () => teacherApi.getGradebook(classId) });

export const useSaveAttendance = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ classId, records }: { classId: string; records: Record<string, string> }) =>
      teacherApi.saveAttendance(classId, records),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["teacher", "attendance"] }),
  });
};
