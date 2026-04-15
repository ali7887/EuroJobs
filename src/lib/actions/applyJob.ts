export async function applyJob(data: {
  coverLetter: string;
  resumeUrl: string;
  jobId: string;
}) {
  const res = await fetch("/api/applications", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}
