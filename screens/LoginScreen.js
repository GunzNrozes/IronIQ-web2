import React, { useMemo, useState } from "react";
import { Alert, View } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Card, H1, Input, Label, P, Row, Screen } from "../components/Ui";
import { BRAND, SPACING } from "../constants/brand";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

export default function LoginScreen({ onAuthed }) {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const canSubmit = useMemo(() => {
    if (!validateEmail(email)) return false;
    if (!password || password.length < 8) return false;
    return true;
  }, [email, password]);

  async function handleAuth() {
    if (!canSubmit) {
      Alert.alert("Check your details", "Use a valid email and a password (8+ characters).");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        // If email confirmation is ON, session may be null until verified.
        if (data?.session) {
          onAuthed?.(data.session);
          return;
        }
        Alert.alert(
          "Verify your email",
          "Check your inbox to confirm your email, then come back and log in."
        );
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onAuthed?.(data.session);
      }
    } catch (e) {
      Alert.alert("Authentication error", e?.message ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Screen>
      <H1>IRONIQ</H1>
      <P style={{ marginTop: 6, marginBottom: SPACING.lg }}>
        Sign in with your email so your training data stays personal.
      </P>

      <Card>
        <Label>Email</Label>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="you@domain.com"
          keyboardType="email-address"
        />

        <Label>Password</Label>
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Minimum 8 characters"
          secureTextEntry
        />

        <Button
          title={mode === "signup" ? "Create account" : "Log in"}
          onPress={handleAuth}
          disabled={busy || !canSubmit}
        />

        <View style={{ height: SPACING.md }} />

        <Row style={{ justifyContent: "space-between" }}>
          <P style={{ color: BRAND.subtext }}>
            {mode === "signup" ? "Already have an account?" : "New to IRONIQ?"}
          </P>
          <Button
            title={mode === "signup" ? "Log in" : "Sign up"}
            variant="ghost"
            onPress={() => setMode(mode === "signup" ? "login" : "signup")}
            disabled={busy}
          />
        </Row>

        <View style={{ height: SPACING.sm }} />
        <P style={{ fontSize: 12 }}>
          Password login uses Supabase Auth. You can add magic links later without changing your user model.
        </P>
      </Card>
    </Screen>
  );
}
