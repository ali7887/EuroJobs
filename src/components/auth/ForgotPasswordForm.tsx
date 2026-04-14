"use client";

import React, { useState } from "react";
import styles from "../ui/form.module.css";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Mail } from "lucide-react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
      } else {
        setMsg("Reset link sent (check console)");
      }
    } catch {
      setError("Network error");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Forgot password</h2>
      <p className={styles.subtitle}>We will send a reset link</p>

      {msg && <div className={styles.success}>{msg}</div>}
      {error && <div className={styles.error}>{error}</div>}

      <Input
        label="Email"
        icon={<Mail size={18} />}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />

      <Button fullWidth loading={loading}>
        Send Reset Link
      </Button>
    </form>
  );
}
