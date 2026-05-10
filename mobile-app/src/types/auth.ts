export type UserRole = "teacher" | "student" | "parent";

export interface Credentials {
  schoolCode: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarInitials: string;
  schoolCode: string;
  // Teacher-specific
  subject?: string;
  // Student-specific
  grade?: string;
  studentId?: string;
  // Parent-specific
  childName?: string;
  childGrade?: string;
  childId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
