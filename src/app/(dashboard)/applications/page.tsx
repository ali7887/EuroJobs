import { auth } from "@clerk/nextjs/server";

export default async function ApplicationsDashboardPage() {
  const { userId } = await auth();

  if (!userId) return <p>Unauthorized</p>;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/me/applications`, {
    cache: "no-store",
  });

  const { applications } = await res.json();

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Applications</h1>

      <div className="space-y-4">
        {applications.length === 0 && (
          <p className="text-gray-500">You haven't applied to any jobs yet.</p>
        )}

        {applications.map((app: any) => (
          <div
            key={app.id}
            className="border p-4 rounded-lg shadow-sm hover:shadow transition"
          >
            <h2 className="text-xl font-semibold">{app.job.title}</h2>
            <p className="text-gray-600">
              Status: <span className="font-medium">{app.status}</span>
            </p>
            <p className="text-gray-600 text-sm">
              Applied At: {new Date(app.createdAt).toLocaleDateString()}
            </p>

            <a
              href={`/jobs/${app.jobId}`}
              className="text-blue-500 underline mt-2 inline-block"
            >
              View job →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
