"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

// 💡 علی، تعریف Interface برای Job باعث می‌شود در کل کامپوننت Type-Safety داشته باشیم.
interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  status?: string;
}

interface EmployerJobDetailsProps {
  params: {
    id: string;
  };
}

export default function EmployerJobDetails({ params }: EmployerJobDetailsProps) {
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/employer/jobs/${params.id}`);
        
        if (!response.ok) {
          throw new Error("خطا در بارگذاری اطلاعات شغل.");
        }
        
        const data = await response.json();
        setJob(data);
      } catch (err: any) {
        setError(err.message || "مشکلی پیش آمده است.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm("آیا از حذف این آگهی اطمینان دارید؟")) return;

    try {
      const response = await fetch(`/api/employer/jobs/${params.id}`, { 
        method: "DELETE" 
      });

      if (response.ok) {
        // بعد از حذف، به لیست برمی‌گردیم و صفحه را refresh می‌کنیم تا کش پاک شود
        router.push("/employer/jobs");
        router.refresh(); 
      } else {
        alert("حذف آگهی با خطا مواجه شد.");
      }
    } catch (err) {
      console.error("Delete operation failed:", err);
    }
  };

  if (loading) {
    return <div className="p-8 text-center animate-pulse">در حال دریافت جزییات آگهی...</div>;
  }

  if (error || !job) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>{error || "شغل مورد نظر یافت نشد."}</p>
        <Button onClick={() => router.back()} className="mt-4">بازگشت</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 space-y-6">
      <div className="flex justify-between items-start border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-gray-500 flex items-center gap-1 mt-1">
            <span className="i-lucide-map-pin w-4 h-4" /> {job.location}
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
             
            onClick={() => router.push(`/employer/jobs/${params.id}/edit`)}
          >
            ویرایش
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
          >
            حذف آگهی
          </Button>
        </div>
      </div>

      <div className="prose prose-blue max-w-none">
        <h3 className="text-lg font-semibold mb-2">توضیحات شغل</h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {job.description}
        </p>
      </div>

      <div className="pt-6 border-t">
        <Button variant="ghost" onClick={() => router.back()}>
          ← بازگشت به لیست
        </Button>
      </div>
    </div>
  );
}
