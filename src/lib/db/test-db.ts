// src/lib/db/test-db.ts
import { db, initDB } from './db';
import { Company, Job } from './schema';

const company: Company = {
  id: 'company-1',
  name: 'TechCorp',
  logo: '/logos/techcorp.png',
  website: 'https://techcorp.com',
  createdAt: new Date().toISOString(),  
};

const job: Job = {
  id: 'job-1',
  title: 'Senior TypeScript Developer',
  description: 'We are looking for an experienced TypeScript developer.',
  location: 'Remote',
  salary: '80000-120000',               
  salaryMin: 80000,                      
  salaryMax: 120000,                     
  type: 'REMOTE',
  jobType: 'remote',
  companyId: 'company-1',
  categoryId: 'cat-1',
  published: true,
  isActive: true,                        
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

async function seedDatabase() {
  await initDB();

  db.data!.companies = [company];
  db.data!.jobs = [job];
  db.data!.categories = [
    { id: 'cat-1', name: 'Engineering', slug: 'engineering' },
  ];
  db.data!.users = [];
  db.data!.applications = [];

  await db.write();
  console.log('✅ Database seeded successfully');
}

seedDatabase().catch(console.error);
