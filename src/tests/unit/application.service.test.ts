import { describe, it, expect, vi, beforeEach, type Mocked } from "vitest";
import { applicationService } from "@/lib/services/application.service";
import { jobApplicationsRepository } from "@/lib/repositories/job-applications.repository";

// Mock repo with correct return types
const mockedRepo = jobApplicationsRepository as Mocked<typeof jobApplicationsRepository>;

vi.mock("@/lib/repositories/job-applications.repository");

describe("applicationService", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should apply to a job successfully", async () => {
    // findExisting returns array
    mockedRepo.findExisting.mockResolvedValue([]);

    // create returns array of created rows
    mockedRepo.create.mockResolvedValue([
      {
        id: 1,
        userId: 10,
        jobId: 20,
        resumePath: "/resume.pdf",
        coverLetter: null,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const result = await applicationService.applyToJob(10, 20, {
      resumePath: "/resume.pdf",
    });

    expect(result.id).toBe(1);
    expect(result.userId).toBe(10);
  });

  it("should block duplicates", async () => {
    mockedRepo.findExisting.mockResolvedValue([{} as any]);

    await expect(
      applicationService.applyToJob(10, 20, {})
    ).rejects.toThrow("Already applied");
  });

  it("should get application by id", async () => {
    mockedRepo.findById.mockResolvedValue({
      id: 1,
      userId: 10,
      jobId: 20,
      resumePath: "/resume.pdf",
      coverLetter: null,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await applicationService.getApplicationById(1);

    expect(result.id).toBe(1);
    expect(result.userId).toBe(10);
  });
});
