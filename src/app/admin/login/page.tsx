"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./admin-login.module.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/admin/dashboard",
    });

    setLoading(false);

    if (res?.ok) {
      window.location.href = "/admin/dashboard";
    } else {
      alert("Invalid admin credentials");
    }
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={submit} className={styles.card}>
        <h2 className={styles.title}>Admin Login</h2>

        <input
          className={styles.input}
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
