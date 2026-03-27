import JobForm from "@/components/jobs/JobForm";

export default function NewJobPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Post a New Job
        </h1>
        <JobForm />
      </div>
    </main>
  );
}
