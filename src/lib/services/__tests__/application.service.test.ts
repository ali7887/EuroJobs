import { applicationService } from "@/lib/services/application.service";
import { jobApplicationsRepository as repo } from "@/lib/repositories/job-applications.repository";
import { mockApplication } from "../__mocks__/application.mock";
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

describe("applicationService.applyToJob", () => {
  it("should create a new application when none exists", async () => {
    jobApplicationsRepository.findExisting.mockResolvedValue([]);

    jobApplicationsRepository.create.mockResolvedValue([
      mockApplication({ status: "pending" }),
    ]);

    const result = await applicationService.applyToJob(20, 10, {});

    expect(result).toEqual(
      mockApplication({ status: "pending" })
    );
  });

  it("should throw error when already applied", async () => {
    jobApplicationsRepository.findExisting.mockResolvedValue([
      mockApplication(),
    ]);

    await expect(
      applicationService.applyToJob(20, 10, {})
    ).rejects.toThrow("Already applied");
  });
});

describe("applicationService.getApplicationById", () => {
  it("should return the application", async () => {
    jobApplicationsRepository.findById.mockResolvedValue(
      mockApplication({ id: 1 })
    );

    const result = await applicationService.getApplicationById(1);
    expect(result).toEqual(mockApplication({ id: 1 }));
  });
});

describe("applicationService.updateStatus", () => {
  it("should update status and return updated record", async () => {
    jobApplicationsRepository.updateStatus.mockResolvedValue([
      mockApplication({ status: "accepted" }),
    ]);

    const result = await applicationService.updateStatus(1, {
      status: "accepted" as ApplicationStatus,
    });

    expect(result[0].status).toBe("accepted");
  });
});

describe("applicationService.deleteApplication", () => {
  it("should delete application", async () => {
    jobApplicationsRepository.delete.mockResolvedValue({} as any);

    const result = await applicationService.deleteApplication(1);

    expect(result).toEqual({});
  });
});
