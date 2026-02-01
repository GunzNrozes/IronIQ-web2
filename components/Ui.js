import React from "react";
import { Pressable, Text, View, TextInput } from "react-native";
import { BRAND, SPACING } from "../constants/brand";

export function Screen({ children }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: BRAND.bg,
        padding: SPACING.lg,
      }}
    >
      {children}
    </View>
  );
}

export function Card({ children, style }) {
  return (
    <View
      style={[
        {
          backgroundColor: BRAND.card,
          borderColor: BRAND.border,
          borderWidth: 1,
          borderRadius: 18,
          padding: SPACING.lg,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function H1({ children }) {
  return (
    <Text style={{ color: BRAND.text, fontSize: 26, fontWeight: "800" }}>
      {children}
    </Text>
  );
}

export function P({ children, style }) {
  return (
    <Text style={[{ color: BRAND.subtext, fontSize: 14, lineHeight: 20 }, style]}>
      {children}
    </Text>
  );
}

export function Label({ children }) {
  return (
    <Text style={{ color: BRAND.subtext, fontSize: 12, marginBottom: 6 }}>
      {children}
    </Text>
  );
}

export function Input(props) {
  return (
    <TextInput
      {...props}
      autoCapitalize="none"
      autoCorrect={false}
      placeholderTextColor="#7380A8"
      style={[
        {
          color: BRAND.text,
          borderColor: BRAND.border,
          borderWidth: 1,
          borderRadius: 14,
          paddingVertical: 12,
          paddingHorizontal: 14,
          marginBottom: SPACING.md,
          backgroundColor: "rgba(255,255,255,0.02)",
        },
        props.style,
      ]}
    />
  );
}

export function Button({ title, onPress, variant = "primary", disabled }) {
  const bg =
    variant === "danger"
      ? BRAND.danger
      : variant === "ghost"
      ? "transparent"
      : BRAND.accent;

  const border =
    variant === "ghost" ? { borderWidth: 1, borderColor: BRAND.border } : {};

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          backgroundColor: bg,
          paddingVertical: 12,
          borderRadius: 14,
          alignItems: "center",
          opacity: disabled ? 0.55 : pressed ? 0.9 : 1,
        },
        border,
      ]}
    >
      <Text style={{ color: BRAND.text, fontWeight: "800" }}>{title}</Text>
    </Pressable>
  );
}

export function Row({ children, style }) {
  return (
    <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
      {children}
    </View>
  );
}
