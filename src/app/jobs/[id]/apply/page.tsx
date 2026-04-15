import { jobService } from "@/lib/services/job.service";
import { applicationService } from "@/lib/services/application.service";
import { ApplyForm } from "@/components/applications/ApplyForm";
import { auth } from "@clerk/nextjs/server";

export default async function ApplyJobPage({
  params,
}: {
  params: { id: string };
}) {
  const jobId = Number(params.id);

  const { userId } = await auth(); // ✔ اصلاح شد

  if (!userId) {
    return <p>Not authenticated</p>;
  }

  const job = await jobService.getJob(jobId);

  const existing = await applicationService.existingApplication(
    jobId,
    Number(userId)
  );

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Apply for {job?.title}</h1>

      {existing.length > 0 ? (
        <p className="text-red-500">You already applied</p>
      ) : (
        <ApplyForm jobId={params.id} />
      )}
    </div>
  );
}
