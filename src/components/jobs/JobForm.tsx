"use client";

import { useState } from "react";
import { Button } from "../ui/Button/Button";

interface JobFormProps {
  onSuccess?: () => void;
}

export default function JobForm({ onSuccess }: JobFormProps) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", location: "",
    salary: "", type: "full-time", companyId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title"       value={form.title}       onChange={handleChange} placeholder="Job Title"    className="w-full border rounded p-2" />
      <input name="location"    value={form.location}    onChange={handleChange} placeholder="Location"     className="w-full border rounded p-2" />
      <input name="salary"      value={form.salary}      onChange={handleChange} placeholder="Salary"       className="w-full border rounded p-2" />
      <input name="companyId"   value={form.companyId}   onChange={handleChange} placeholder="Company ID"   className="w-full border rounded p-2" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border rounded p-2" />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Post Job"}
      </Button>
    </form>
  );
}
