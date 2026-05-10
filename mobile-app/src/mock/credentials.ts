import { UserRole } from "@/types/auth";

export interface MockCredential {
  schoolCode: string;
  email: string;
  password: string;
  role: UserRole;
  userId: string;
}

export const MOCK_CREDENTIALS: MockCredential[] = [
  {
    schoolCode: "EDU001",
    email: "teacher@eduease.com",
    password: "Teacher@123",
    role: "teacher",
    userId: "teacher-001",
  },
  {
    schoolCode: "EDU001",
    email: "student@eduease.com",
    password: "Student@123",
    role: "student",
    userId: "student-001",
  },
  {
    schoolCode: "EDU001",
    email: "parent@eduease.com",
    password: "Parent@123",
    role: "parent",
    userId: "parent-001",
  },
];

export const DEMO_CREDENTIALS: Record<UserRole, { email: string; password: string; schoolCode: string }> = {
  teacher: { schoolCode: "EDU001", email: "teacher@eduease.com", password: "Teacher@123" },
  student: { schoolCode: "EDU001", email: "student@eduease.com", password: "Student@123" },
  parent: { schoolCode: "EDU001", email: "parent@eduease.com", password: "Parent@123" },
};
