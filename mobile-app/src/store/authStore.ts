import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, UserRole } from "@/types/auth";
import { MOCK_CREDENTIALS } from "@/mock/credentials";
import { MOCK_USERS } from "@/mock/users";

const AUTH_STORAGE_KEY = "@eduease_auth";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (schoolCode: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (schoolCode, email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 900));

      const match = MOCK_CREDENTIALS.find(
        (c) =>
          c.schoolCode.toLowerCase() === schoolCode.toLowerCase() &&
          c.email.toLowerCase() === email.toLowerCase() &&
          c.password === password
      );

      if (!match) {
        set({ isLoading: false, error: "Invalid credentials. Please try again." });
        return;
      }

      const user = MOCK_USERS[match.userId];
      if (!user) {
        set({ isLoading: false, error: "User account not found." });
        return;
      }

      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false, error: null });
    } catch {
      set({ isLoading: false, error: "Something went wrong. Please try again." });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    set({ user: null, isAuthenticated: false, error: null });
  },

  restoreSession: async () => {
    set({ isLoading: true });
    try {
      const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const user: User = JSON.parse(stored);
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
