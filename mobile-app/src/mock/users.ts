import { User } from "@/types/auth";

export const MOCK_USERS: Record<string, User> = {
  "teacher-001": {
    id: "teacher-001",
    name: "Ms. Sarah Chen",
    email: "teacher@eduease.com",
    role: "teacher",
    avatarInitials: "SC",
    schoolCode: "EDU001",
    subject: "Mathematics",
  },
  "student-001": {
    id: "student-001",
    name: "Arjun Mehta",
    email: "student@eduease.com",
    role: "student",
    avatarInitials: "AM",
    schoolCode: "EDU001",
    grade: "Grade 9 – Section A",
    studentId: "STU-2024-0912",
  },
  "parent-001": {
    id: "parent-001",
    name: "Priya Mehta",
    email: "parent@eduease.com",
    role: "parent",
    avatarInitials: "PM",
    schoolCode: "EDU001",
    childName: "Arjun Mehta",
    childGrade: "Grade 9 – Section A",
    childId: "STU-2024-0912",
  },
};
