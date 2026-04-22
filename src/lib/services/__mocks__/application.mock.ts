import { ApplicationStatus } from "@/lib/db/schema/applications";

export type MockApplication = {
  id: number;
  jobId: number;
  userId: number;
  status: ApplicationStatus;
  resumePath: string | null;
  coverLetter: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export function mockApplication(
  overrides: Partial<MockApplication> = {}
): MockApplication {
  return {
    id: 1,
    jobId: 1,
    userId: 1,
    status: "pending",
    resumePath: null,
    coverLetter: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}
