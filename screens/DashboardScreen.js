import React from "react";
import { View } from "react-native";
import { supabase } from "../lib/supabase";
import { Button, Card, H1, P, Screen } from "../components/Ui";
import { SPACING } from "../constants/brand";

export default function DashboardScreen({ session }) {
  const email = session?.user?.email ?? "Unknown";

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <Screen>
      <H1>Dashboard</H1>
      <P style={{ marginTop: 6, marginBottom: SPACING.lg }}>
        You’re signed in as <P style={{ color: "#EAF0FF" }}>{email}</P>
      </P>

      <Card>
        <P>
          This is the authenticated area. Next step is wiring your IRONIQ features (logging, history,
          analytics) to this user account.
        </P>

        <View style={{ height: SPACING.lg }} />
        <Button title="Sign out" variant="danger" onPress={signOut} />
      </Card>
    </Screen>
  );
}
