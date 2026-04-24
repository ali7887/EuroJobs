import { type Application } from "@/lib/db/schema";

export type ApplicationStatus =
  | "pending"
  | "reviewing"
  | "accepted"
  | "rejected";

export interface ApplicationCreateInput {
  jobId: string;
  userId: string;
  coverLetter?: string;
  resumeUrl?: string;
}

export interface ApplicationUpdateInput {
  status?: ApplicationStatus;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface ApplicationWithDetails extends Application {
  jobTitle: string;
  companyName: string;
  userName: string;
  userEmail: string;
}

export type { Application };
