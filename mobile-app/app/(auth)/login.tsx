import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react-native";
import { Colors } from "@/constants/colors";
import { Layout } from "@/constants/layout";
import { TextInput } from "@/components/ui/TextInput";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";
import { UserRole } from "@/types/auth";
import { DEMO_CREDENTIALS } from "@/mock/credentials";

const ROLES: { key: UserRole; label: string; emoji: string }[] = [
  { key: "teacher", label: "Teacher", emoji: "📚" },
  { key: "student", label: "Student", emoji: "🎓" },
  { key: "parent", label: "Parent", emoji: "👨‍👩‍👧" },
];

interface LoginForm {
  schoolCode: string;
  email: string;
  password: string;
}

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [selectedRole, setSelectedRole] = useState<UserRole>("teacher");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuthStore();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<LoginForm>({
    defaultValues: { schoolCode: "EDU001", email: "", password: "" },
  });

  const fillDemo = useCallback(() => {
    const creds = DEMO_CREDENTIALS[selectedRole];
    setValue("schoolCode", creds.schoolCode);
    setValue("email", creds.email);
    setValue("password", creds.password);
  }, [selectedRole, setValue]);

  const onSubmit = useCallback(
    async (data: LoginForm) => {
      await login(data.schoolCode, data.email, data.password);
    },
    [login]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoArea}>
          <Text style={styles.logoEmoji}>🎓</Text>
          <Text style={styles.logoText}>EduEase</Text>
          <Text style={styles.tagline}>Learning made simple</Text>
        </View>

        {/* Role Selector */}
        <View style={styles.roleRow}>
          {ROLES.map((role) => (
            <TouchableOpacity
              key={role.key}
              style={[
                styles.roleChip,
                selectedRole === role.key && styles.roleChipActive,
              ]}
              onPress={() => {
                setSelectedRole(role.key);
                setValue("email", "");
                setValue("password", "");
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.roleEmoji}>{role.emoji}</Text>
              <Text
                style={[
                  styles.roleLabel,
                  selectedRole === role.key && styles.roleLabelActive,
                ]}
              >
                {role.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Heading */}
        <View style={styles.headingArea}>
          <Text style={styles.heading}>Welcome back.</Text>
          <Text style={styles.subheading}>
            {selectedRole === "teacher"
              ? "Sign in to manage your classes and students."
              : selectedRole === "student"
              ? "Sign in to track your progress and assignments."
              : "Sign in to monitor your child's learning journey."}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Controller
            control={control}
            name="schoolCode"
            rules={{ required: "School code is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="School Code"
                placeholder="e.g. EDU001"
                value={value}
                onChangeText={onChange}
                autoCapitalize="characters"
                error={errors.schoolCode?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Email"
                placeholder="you@school.edu"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Password"
                placeholder="••••••••"
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showPassword}
                error={errors.password?.message}
                rightElement={
                  <TouchableOpacity onPress={() => setShowPassword((p) => !p)} activeOpacity={0.7}>
                    {showPassword
                      ? <EyeOff size={18} color={Colors.ink[3]} strokeWidth={1.75} />
                      : <Eye size={18} color={Colors.ink[3]} strokeWidth={1.75} />
                    }
                  </TouchableOpacity>
                }
              />
            )}
          />

          {error && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <Button
            label="Sign in"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            style={styles.cta}
          />

          <TouchableOpacity style={styles.demoBtn} onPress={fillDemo} activeOpacity={0.7}>
            <Text style={styles.demoBtnText}>
              Fill demo credentials for {selectedRole}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Use Face ID next time</Text>
          <Text style={styles.footerDot}>·</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.footerLink}>Switch role</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surface.page,
  },
  content: {
    paddingHorizontal: Layout.screenPaddingH,
    paddingBottom: 40,
    gap: 24,
  },
  logoArea: {
    alignItems: "center",
    paddingTop: 40,
    gap: 4,
  },
  logoEmoji: {
    fontSize: 48,
  },
  logoText: {
    fontSize: 32,
    fontFamily: "SpaceGrotesk-Bold",
    fontWeight: "700",
    color: Colors.ink[1],
    letterSpacing: -0.64,
  },
  tagline: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: Colors.ink[2],
  },
  roleRow: {
    flexDirection: "row",
    gap: 8,
  },
  roleChip: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.line,
    backgroundColor: Colors.surface.card,
    gap: 4,
  },
  roleChipActive: {
    borderColor: Colors.scholar[500],
    backgroundColor: Colors.scholar[50],
  },
  roleEmoji: {
    fontSize: 22,
  },
  roleLabel: {
    fontSize: 12,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[2],
  },
  roleLabelActive: {
    color: Colors.scholar[700],
  },
  headingArea: {
    gap: 6,
  },
  heading: {
    fontSize: 28,
    fontFamily: "SpaceGrotesk-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
    letterSpacing: -0.56,
  },
  subheading: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: Colors.ink[2],
    lineHeight: 20,
  },
  form: {
    gap: 16,
  },
  errorBanner: {
    backgroundColor: Colors.rose[50],
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.rose[100],
  },
  errorText: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: Colors.rose[700],
    textAlign: "center",
  },
  cta: {
    marginTop: 4,
  },
  demoBtn: {
    alignItems: "center",
    paddingVertical: 8,
  },
  demoBtnText: {
    fontSize: 13,
    fontFamily: "Inter-Medium",
    color: Colors.scholar[600],
    textDecorationLine: "underline",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: Colors.ink[3],
  },
  footerDot: {
    color: Colors.ink[3],
  },
  footerLink: {
    fontSize: 12,
    fontFamily: "Inter-SemiBold",
    color: Colors.scholar[600],
  },
});
