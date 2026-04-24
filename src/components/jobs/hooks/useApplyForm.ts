"use client";

import { useState } from "react";

interface UseApplyFormOptions {
  jobId: string;
}

export function useApplyForm({ jobId }: UseApplyFormOptions) {
  const [coverLetter, setCoverLetter] = useState("");
  const [resumePath, setResumePath] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ✅ تنها نسخه صحیح و نهایی uploadResume
  const uploadResume = async (file: File) => {
    // 1) client-side validation قبل از ارسال request
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File must be smaller than 5MB");
    }

    if (file.type !== "application/pdf") {
      throw new Error("Only PDF files are allowed");
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/resume/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Resume upload failed");
    }

    const data = await res.json();

    // مسیر رزومه ذخیره شده روی سرور
    setResumePath(data.path);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coverLetter,
          resumePath,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to apply");
      }

      setSuccess(true);
      setCoverLetter("");
      // 👇 اگر خواستی بعد از موفقیت، رزومه را هم reset کنی، این را هم اضافه کن:
      // setResumePath("");
    } catch (err: any) {
      setError(err?.message || "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    fields: {
      coverLetter,
      resumePath,
    },
    setters: {
      setCoverLetter,
      setResumePath,
    },
    state: {
      isSubmitting,
      error,
      success,
    },
    handleSubmit,
    uploadResume,
  };
}
