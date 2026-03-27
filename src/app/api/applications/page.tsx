import ApplicationList from "@/components/applications/ApplicationList";

export default function ApplicationsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          My Applications
        </h1>
        <ApplicationList userId="temp-user-id" />
      </div>
    </main>
  );
}
