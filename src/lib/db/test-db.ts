// src/lib/db/test-db.ts
import { db, initDB } from './db';
import { Company, Job } from './schema';

// ✅ فقط فیلدهای موجود در schema
const company: Company = {
  id: 'company-1',
  name: 'TechCorp',
  logo: '/logos/techcorp.png',
  website: 'https://techcorp.com',
  // createdAt حذف شد - در schema نیست
};

const job: Job = {
  id: 'job-1',
  title: 'Senior TypeScript Developer',
  description: 'We are looking for an experienced TypeScript developer.',
  location: 'Remote',
  salary: '80000-120000', // ✅ یک فیلد string
  type: 'REMOTE',
  jobType: 'remote', // ✅ optional
  isActive: true, // ✅ boolean
  companyId: 'company-1',
  categoryId: 'cat-1',
  published: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: '',
  jobEmbeddings: ''
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
