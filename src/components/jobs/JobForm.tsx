"use client";

import { useState } from "react";
import Button from "../ui/Button/Button";
import styles from "./job-form.module.css";

interface JobFormProps {
  onSuccess?: () => void;
}

export default function JobForm({ onSuccess }: JobFormProps) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    type: "full-time",
    companyId: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          salary: form.salary ? Number(form.salary) : undefined,
        }),
      });

      setForm({
        title: "",
        description: "",
        location: "",
        salary: "",
        type: "full-time",
        companyId: "",
      });

      onSuccess?.();

    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Job Title"
        className={styles.input}
      />

      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className={styles.input}
      />

      <input
        name="salary"
        value={form.salary}
        onChange={handleChange}
        placeholder="Salary"
        className={styles.input}
      />

      <input
        name="companyId"
        value={form.companyId}
        onChange={handleChange}
        placeholder="Company ID"
        className={styles.input}
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className={styles.textarea}
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Post Job"}
      </Button>

    </form>
  );
}
