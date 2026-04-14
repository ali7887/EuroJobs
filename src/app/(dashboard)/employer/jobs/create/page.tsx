"use client";

import { useState } from "react";
import Button from "@/components/ui/Button/Button"; // ✅ اصلاح شد
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";

export default function CreateJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skills: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async () => {
    const token = localStorage.getItem("accessToken");
    const res = await fetch("/api/jobs/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        ...form,
        salary: form.salary ? Number(form.salary) : undefined,
        skills: form.skills.split(",").map((s) => s.trim()),
      }),
    });

    if (res.ok) router.push("/dashboard/employer/jobs");
    else console.error(await res.json());
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ fontSize: "1.3rem", marginBottom: 16 }}>Create Job</h2>
      <Input label="Title" name="title" value={form.title} onChange={handleChange} />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        style={{ width: "100%", marginTop: 16, padding: 12 }}
      />
      <Input label="Location" name="location" value={form.location} onChange={handleChange} />
      <Input label="Salary" name="salary" value={form.salary} onChange={handleChange} />
      <Input
        label="Skills (comma separated)"
        name="skills"
        value={form.skills}
        onChange={handleChange}
      />
      <div style={{ marginTop: 20 }}>
        <Button onClick={submit}>Create Job</Button>
      </div>
    </div>
  );
}
