// src/app/(dashboard)/employer/jobs/[id]/page.tsx
import EmployerJobDetails from "./mployerJobDetails.client";

type Params = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Params) {
  const { id } = await params;

  return <EmployerJobDetails params={{ id }} />;
}
