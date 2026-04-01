import ApplicationList from "@/components/applications/ApplicationList";

export default function ApplicationsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Applications</h1>
      <ApplicationList jobId="temp-job-id" />
    </div>
  );
}
