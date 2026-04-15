export function mockApplication(overrides = {}) {
  return {
    id: 1,
    jobId: 10,
    userId: 20,
    status: "pending",
    resumePath: null,
    coverLetter: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}
