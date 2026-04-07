// src/lib/db/test-db.ts
import { db, initDB } from './db';
import { Company, Job } from './schema';

const company: Company = {
  id: 'company-1',
  name: 'TechCorp',
  description: 'A leading tech company',
  logoUrl: '/logos/techcorp.png',       // ✅ logoUrl نه logo
  website: 'https://techcorp.com',
  location: 'Remote',
  ownerId: 'user-1',                    // ✅ اجباری در schema
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const job: Job = {
  id: 'job-1',
  title: 'Senior TypeScript Developer',
  description: 'We are looking for an experienced TypeScript developer.',
  company: 'TechCorp', // ✅ display name (denormalized)
  companyId: 'company-1',
  employerId: 'user-1', // ✅ اجباری
  type: 'remote',
  location: '',
  skills: [],
  isActive: false,
  published: false,
  createdAt: '',
  updatedAt: ''
}                       // ✅ JobType: 'full-time'|