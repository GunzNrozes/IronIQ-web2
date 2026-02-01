import React, { useEffect, useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { supabase } from "./lib/supabase";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";

/**
 * Manual routing:
 * - If not authenticated => Login
 * - If authenticated => Dashboard
 */
export default function App() {
  const [session, setSession] = useState(null);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setBooted(true);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  const screen = useMemo(() => {
    if (!booted) return null;
    if (!session) return <LoginScreen onAuthed={() => {}} />;
    return <DashboardScreen session={session} />;
  }, [booted, session]);

  return (
    <>
      {screen}
      <StatusBar style="light" />
    </>
  );
}
