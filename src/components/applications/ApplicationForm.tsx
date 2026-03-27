"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button/Button";

interface ApplicationFormProps {
  jobId: string;
}

export default function ApplicationForm({ jobId }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    coverLetter: "",
    resumeUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobId,
        userId: "temp-user-id", // Replace with actual user ID
        ...formData,
        status: "pending",
      }),
    });

    if (response.ok) {
      alert("Application submitted successfully!");
      setFormData({ coverLetter: "", resumeUrl: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Apply for this position</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cover Letter
        </label>
        <textarea
          value={formData.coverLetter}
          onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg h-40"
          required
        />
      </div>

      <Input
        label="Resume URL"
        type="url"
        value={formData.resumeUrl}
        onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
        placeholder="https://example.com/resume.pdf"
        required
      />

      <Button type="submit" className="w-full">
        Submit Application
      </Button>
    </form>
  );
}
