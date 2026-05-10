import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CheckCircle } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "@/components/layout/Header";
import { SafeLayout } from "@/components/layout/SafeLayout";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Divider } from "@/components/ui/Divider";
import { CardShimmer } from "@/components/ui/Shimmer";
import { useAuthStore } from "@/store/authStore";
import { useFeeBreakdown, useRecentPayments, useParentStats } from "@/hooks/useParentData";
import { Colors } from "@/constants/colors";
import { Layout } from "@/constants/layout";

export default function FeesScreen() {
  const { user } = useAuthStore();
  const { data: breakdown, isLoading: feeLoading } = useFeeBreakdown();
  const { data: payments, isLoading: payLoading } = useRecentPayments();
  const { data: stats } = useParentStats();

  const total = breakdown?.reduce((s, f) => s + (f.paid ? 0 : f.amount), 0) ?? stats?.feesDue ?? 0;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface.page }}>
      <Header title="Fees" subtitle={user?.childName ?? ""} userName={user?.name ?? ""} />
      <SafeLayout>
        <View style={{ height: 16 }} />

        {/* Outstanding Card */}
        <LinearGradient
          colors={["#5B5BE5", "#8C5BD6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.outstandingCard}
        >
          <View style={styles.circle} />
          <Text style={styles.outstandingLabel}>Outstanding Amount</Text>
          <Text style={styles.outstandingAmount}>₹{total.toLocaleString("en-IN")}</Text>
          <Text style={styles.dueDate}>Due by May 20, 2026</Text>
          <Button
            label="Pay now · UPI / Card"
            onPress={() => {}}
            style={[styles.payBtn, { backgroundColor: "rgba(255,255,255,0.18)" }]}
          />
        </LinearGradient>

        {/* Breakdown */}
        <SectionHeader title="Breakdown" />
        <Card style={{ marginBottom: 16 }}>
          {feeLoading
            ? <CardShimmer />
            : breakdown?.map((fee, idx) => (
                <View key={fee.id}>
                  <View style={styles.feeRow}>
                    <Text style={styles.feeLabel}>{fee.label}</Text>
                    <Text style={[styles.feeAmount, fee.paid && styles.feePaid]}>
                      {fee.paid ? "Paid" : `₹${fee.amount.toLocaleString("en-IN")}`}
                    </Text>
                  </View>
                  {idx < breakdown.length - 1 && <Divider />}
                </View>
              ))}
        </Card>

        {/* Recent Payments */}
        <SectionHeader title="Payment History" />
        <Card padded={false} style={{ marginBottom: 16 }}>
          {payLoading
            ? <View style={{ padding: 16 }}><CardShimmer /></View>
            : payments?.map((pay) => (
                <View key={pay.id} style={styles.payRow}>
                  <View style={styles.payIconWrap}>
                    <CheckCircle size={16} color={Colors.mint[500]} strokeWidth={1.75} />
                  </View>
                  <View style={styles.payInfo}>
                    <Text style={styles.payLabel}>{pay.label}</Text>
                    <Text style={styles.payInvoice}>{pay.invoiceId} · {pay.date}</Text>
                  </View>
                  <Text style={styles.payAmount}>₹{pay.amount.toLocaleString("en-IN")}</Text>
                </View>
              ))}
        </Card>
      </SafeLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  outstandingCard: {
    marginHorizontal: Layout.screenPaddingH,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    overflow: "hidden",
    gap: 6,
  },
  circle: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255,255,255,0.08)",
    right: -30,
    top: -30,
  },
  outstandingLabel: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "rgba(255,255,255,0.85)",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  outstandingAmount: {
    fontSize: 36,
    fontFamily: "SpaceGrotesk-Bold",
    fontWeight: "700",
    color: "#fff",
    letterSpacing: -0.72,
    lineHeight: 44,
  },
  dueDate: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: "rgba(255,255,255,0.8)",
    marginBottom: 8,
  },
  payBtn: {
    borderWidth: 0,
  },
  feeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  feeLabel: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: Colors.ink[1],
  },
  feeAmount: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
  },
  feePaid: {
    color: Colors.mint[600],
  },
  payRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Layout.screenPaddingH,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.line,
    gap: 12,
  },
  payIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.mint[50],
    alignItems: "center",
    justifyContent: "center",
  },
  payInfo: {
    flex: 1,
    gap: 2,
  },
  payLabel: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
  },
  payInvoice: {
    fontSize: 11,
    fontFamily: "JetBrainsMono-Regular",
    color: Colors.ink[3],
  },
  payAmount: {
    fontSize: 15,
    fontFamily: "SpaceGrotesk-SemiBold",
    fontWeight: "600",
    color: Colors.ink[1],
  },
});
