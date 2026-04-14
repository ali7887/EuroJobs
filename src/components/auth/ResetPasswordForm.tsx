"use client";

import React, { useState } from "react";
import styles from "../ui/form.module.css";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
      } else {
        setMsg("Password updated. Redirecting...");
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch {
      setError("Network error");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Reset password</h2>
      <p className={styles.subtitle}>Set a new password</p>

      {msg && <div className={styles.success}>{msg}</div>}
      {error && <div className={styles.error}>{error}</div>}

      <Input
        label="New password"
        icon={<Lock size={18} />}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />

      <Button type="submit" loading={loading} fullWidth>
        Update Password
      </Button>
    </form>
  );
}
