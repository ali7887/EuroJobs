import { ApplicationStatus } from "@/lib/db/schema/applications";

export type MockApplication = {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  resumePath: string | null;
  coverLetter: string | null;
  createdAt: Date;
  updatedAt: Date | null;
};

export function mockApplication(
  overrides: Partial<MockApplication> = {}
): MockApplication {
  return {
    id: "550e8400-e29b-41d4-a716-446655440000",
    jobId: "550e8400-e29b-41d4-a716-446655440001",
    userId: "550e8400-e29b-41d4-a716-446655440002",
    status: "pending",
    resumePath: null,
    coverLetter: null,
    createdAt: new Date(),
    updatedAt: null,
    ...overrides,
  };
}
