import JobSearchBar from "@/components/jobs/JobSearchBar";
import { getJobs } from "@/lib/db/queries/jobs";

type Props = {
  searchParams: {
    search?: string;
    location?: string;
    type?: string;
  };
};

export default async function JobsPage({ searchParams }: Props) {
  const jobs = await getJobs({
    search: searchParams.search,
    location: searchParams.location,
    type: searchParams.type,
  });

  return (
    <div className="jobs-page">

      <JobSearchBar />

      <div className="jobs-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h2>{job.title}</h2>
            <p>{job.companyId}</p>
            <p>
              {job.location} • {job.type}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
