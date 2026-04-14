"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/employer/jobs/${params.id}`)
      .then(r => r.json())
      .then(setJob);
  }, [params.id]);

  const submit = async (e: any) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      location: e.target.location.value,
      salary: Number(e.target.salary.value),
    };

    await fetch(`/api/employer/jobs/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    router.push(`/employer/jobs/${params.id}`);
  };

  if (!job) return <div>در حال بارگذاری...</div>;

  return (
    <form onSubmit={submit} className="space-y-4">
      <h1 className="text-xl font-semibold">ویرایش شغل</h1>

      <input name="title" defaultValue={job.title} className="input" />
      <textarea name="description" defaultValue={job.description} className="input" />
      <input name="location" defaultValue={job.location} className="input" />
      <input name="salary" defaultValue={job.salary ?? ""} type="number" className="input" />

      <Button type="submit">ذخیره تغییرات</Button>
    </form>
  );
}
