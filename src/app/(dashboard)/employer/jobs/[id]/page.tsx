"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function EmployerJobDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/employer/jobs/${params.id}`)
      .then(r => r.json())
      .then(setJob);
  }, [params.id]);

  if (!job) return <div>در حال بارگذاری...</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{job.title}</h1>
      <p>{job.description}</p>
      <p className="text-gray-500">{job.location}</p>

      <div className="flex gap-2">
        <Button onClick={() => router.push(`/employer/jobs/${params.id}/edit`)}>
          ویرایش
        </Button>

        <Button
          variant="danger"
          onClick={async () => {
            await fetch(`/api/employer/jobs/${params.id}`, {
              method: "DELETE",
            });
            router.push("/employer/jobs");
          }}
        >
          حذف
        </Button>
      </div>
    </div>
  );
}
