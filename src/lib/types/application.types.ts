// src/lib/types/application.types.ts

import { Application, User, Job } from '../db/schema';

export type ApplicationCreate = Omit<Application, 'id' | 'createdAt' | 'updatedAt' | 'status'>;

export type ApplicationUpdate = Partial<Pick<Application, 'status' | 'notes' | 'interviewDate'>>;

export type ApplicationWithDetails = Application & {
  user: Pick<User, 'id' | 'name' | 'email' | 'phone'>;
  job: Pick<Job, 'id' | 'title' | 'companyId'>;
};

export type ApplicationListItem = Pick<Application, 'id' | 'status' | 'createdAt'> & {
  jobTitle: string;
  applicantName: string;
};
