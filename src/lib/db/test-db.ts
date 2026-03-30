import { db, initDB } from './db';
import { randomUUID } from 'crypto';

async function testDatabase() {
  console.log('🧪 Testing LowDB...\n');

  // Initialize
  await initDB();
  console.log('✅ Database initialized');

  // Add test company
  const company = {
    id: randomUUID(),
    name: 'Test Company',
    logo: '/logos/test.png',
    website: 'https://test.local',
  };
  db.data.companies.push(company);

  // Add test category
  const category = {
    id: randomUUID(),
    name: 'Software Development',
    slug: 'software-development',
  };
  db.data.categories.push(category);

  // Add test job
  const job = {
    id: randomUUID(),
    title: 'Full Stack Developer',
    description: 'Build amazing web applications with modern technologies',
    location: 'Tehran, Iran',
    salary: '50M - 80M Toman',
    type: 'FULL_TIME' as const,
    companyId: company.id,
    categoryId: category.id,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.data.jobs.push(job);

  await db.write();
  console.log('✅ Test data written\n');

  // Read and display
  await db.read();
  console.log('📊 Database Contents:');
  console.log(`- Companies: ${db.data.companies.length}`);
  console.log(`- Categories: ${db.data.categories.length}`);
  console.log(`- Jobs: ${db.data.jobs.length}\n`);

  console.log('📝 Sample Job:');
  console.log(JSON.stringify(db.data.jobs[0], null, 2));

  console.log('\n✅ Database test complete!');
}

testDatabase().catch(console.error);
