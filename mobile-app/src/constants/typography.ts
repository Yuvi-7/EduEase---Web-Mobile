import { TextStyle } from "react-native";

export const Typography = {
  pageTitle: {
    fontSize: 28,
    fontWeight: "600",
    letterSpacing: -0.56,
    lineHeight: 32,
    fontFamily: "SpaceGrotesk-SemiBold",
  } as TextStyle,

  cardTitle: {
    fontSize: 22,
    fontWeight: "600",
    letterSpacing: -0.44,
    lineHeight: 26,
    fontFamily: "SpaceGrotesk-SemiBold",
  } as TextStyle,

  sectionHeading: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  } as TextStyle,

  statLarge: {
    fontSize: 28,
    fontWeight: "600",
    letterSpacing: -0.56,
    lineHeight: 32,
    fontFamily: "SpaceGrotesk-SemiBold",
  } as TextStyle,

  statXL: {
    fontSize: 36,
    fontWeight: "600",
    letterSpacing: -0.72,
    lineHeight: 40,
    fontFamily: "SpaceGrotesk-SemiBold",
  } as TextStyle,

  subtitle: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    lineHeight: 18,
  } as TextStyle,

  cardContent: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  } as TextStyle,

  body: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    lineHeight: 20,
  } as TextStyle,

  bodySmall: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    lineHeight: 18,
  } as TextStyle,

  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.44,
    textTransform: "uppercase",
    fontFamily: "Inter-Bold",
  } as TextStyle,

  pillLabel: {
    fontSize: 11,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  } as TextStyle,

  tabLabel: {
    fontSize: 10,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  } as TextStyle,

  mono: {
    fontSize: 12,
    fontFamily: "JetBrainsMono-Regular",
  } as TextStyle,

  monoSmall: {
    fontSize: 11,
    fontFamily: "JetBrainsMono-Regular",
  } as TextStyle,

  ctaButton: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
  } as TextStyle,
} as const;
