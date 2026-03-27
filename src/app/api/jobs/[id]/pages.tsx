import ApplicationForm from "@/components/applications/ApplicationForm";
import Card from "@/components/ui/Card";

async function getJob(id: string) {
  const response = await fetch(`http://localhost:3000/api/jobs/${id}`, {
    cache: "no-store",
  });
  return response.json();
}

export default async function JobDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const job = await getJob(params.id);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{job.company}</p>
          
          <div className="flex gap-4 mb-6">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
              {job.type}
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full">
              ${job.salary.toLocaleString()}
            </span>
            <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full">
              {job.location}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Description</h2>
            <p className="text-gray-700">{job.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Requirements</h2>
            <p className="text-gray-700">{job.requirements}</p>
          </div>
        </Card>

        <ApplicationForm jobId={job.id} />
      </div>
    </main>
  );
}
