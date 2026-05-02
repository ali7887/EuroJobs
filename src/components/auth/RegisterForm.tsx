"use client";

import React, { useState } from "react";
import styles from "../ui/form.module.css";
import { useRouter } from "next/navigation";
import { Mail, Lock, User } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function RegisterForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch {
      setError("Network error");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleRegister} className={styles.form}>
      <h2 className={styles.title}>Create an account</h2>
      <p className={styles.subtitle}>Join and start using the platform</p>

      {error && <div className={styles.error}>{error}</div>}

      <Input
        label="Full Name"
        icon={<User size={18} />}
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
        placeholder="John Doe"
      />

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

      <Button type="submit" variant="secondary"
        size="md"

        loading={loading} fullWidth>
        Create Account
      </Button>

      <div className={styles.switch}>
        Already have an account?
        <a href="/login"> Sign in</a>
      </div>
    </form>
  );
}
