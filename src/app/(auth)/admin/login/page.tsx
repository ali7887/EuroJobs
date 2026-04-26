"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./admin-login.module.css";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin/dashboard",
    });
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

        <button className={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
