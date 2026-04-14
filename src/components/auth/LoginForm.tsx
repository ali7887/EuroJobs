"use client";

import React, { useState } from "react";
import styles from "../ui/form.module.css";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      router.push("/dashboard");
    } catch {
      setError("Network error");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <h2 className={styles.title}>Welcome Back</h2>
      <p className={styles.subtitle}>
        Sign in to continue to your dashboard
      </p>

      {error && <div className={styles.error}>{error}</div>}

      <Input
        label="Email"
        icon={<Mail size={18} />}
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        placeholder="you@example.com"
      />

      <Input
        label="Password"
        icon={<Lock size={18} />}
        type="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        placeholder="••••••••"
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        loading={loading}
        fullWidth
      >
        Sign In
      </Button>

      <div className={styles.switch}>
        Don’t have an account?
        <a href="/register"> Create one</a>
      </div>
    </form>
  );
}
