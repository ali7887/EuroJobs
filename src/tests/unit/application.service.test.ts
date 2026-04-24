import { applicationService } from "@/lib/services/application.service";
import { jobApplicationsRepository as repo } from "@/lib/repositories/job-applications.repository";
import { mockApplication } from "../../lib/services/__mocks__/application.mock";
import { ApplicationStatus } from "@/lib/db/schema/applications";

jest.mock("@/lib/repositories/job-applications.repository", () => ({
  jobApplicationsRepository: {
    findExisting: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    getApplicationsByUser: jest.fn(),
    updateStatus: jest.fn(),
    delete: jest.fn(),
  },
}));

const jobApplicationsRepository = repo as jest.Mocked<typeof repo>;

// Test UUIDs
const userId = "550e8400-e29b-41d4-a716-446655440002";
const jobId = "550e8400-e29b-41d4-a716-446655440001";
const applicationId = "550e8400-e29b-41d4-a716-446655440000";

describe("applicationService.applyToJob", () => {
  it("should create a new application when none exists", async () => {
    jobApplicationsRepository.findExisting.mockResolvedValue([]);

    jobApplicationsRepository.create.mockResolvedValue([
      mockApplication({ id: applicationId, status: "pending" }),
    ]);

    const result = await applicationService.applyToJob(userId, jobId, {});

    expect(result).toEqual(
      mockApplication({ id: applicationId, status: "pending" })
    );
  });

  it("should throw error when already applied", async () => {
    jobApplicationsRepository.findExisting.mockResolvedValue([
      mockApplication(),
    ]);

    await expect(
      applicationService.applyToJob(userId, jobId, {})
    ).rejects.toThrow("Already applied");
  });
});

describe("applicationService.getApplicationById", () => {
  it("should return the application", async () => {
    jobApplicationsRepository.findById.mockResolvedValue(
      mockApplication({ id: applicationId })
    );

    const result = await applicationService.getApplicationById(applicationId);
    expect(result).toEqual(mockApplication({ id: applicationId }));
  });
});

describe("applicationService.updateStatus", () => {
  it("should update status and return updated record", async () => {
    jobApplicationsRepository.updateStatus.mockResolvedValue([
      mockApplication({ status: "accepted" }),
    ]);

    const result = await applicationService.updateStatus(applicationId, {
      status: "accepted" as ApplicationStatus,
    });

    expect(result[0].status).toBe("accepted");
  });
});

describe("applicationService.deleteApplication", () => {
  it("should delete application", async () => {
    jobApplicationsRepository.delete.mockResolvedValue([
      mockApplication({ id: applicationId }),
    ]);

    const result = await applicationService.deleteApplication(applicationId);

    expect(result).toEqual([mockApplication({ id: applicationId })]);
  });
});
