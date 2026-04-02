import { db, initDB } from '@/lib/db/db';
import { Company } from '@/lib/db/schema';
import { v4 as uuidv4 } from 'uuid';

export class CompanyRepository {
  async findAll(): Promise<Company[]> {
    await initDB();
    return db.data!.companies;
  }

  async findById(id: string): Promise<Company | undefined> {
    await initDB();
    return db.data!.companies.find((c) => c.id === id);
  }

  async create(input: Omit<Company, 'id'>): Promise<Company> {
    await initDB();
    const company: Company = { id: uuidv4(), ...input };
    db.data!.companies.push(company);
    await db.write();
    return company;
  }

  async update(
    id: string,
    input: Partial<Omit<Company, 'id'>>
  ): Promise<Company | null> {
    await initDB();
    const idx = db.data!.companies.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    db.data!.companies[idx] = { ...db.data!.companies[idx], ...input };
    await db.write();
    return db.data!.companies[idx];
  }

  async delete(id: string): Promise<boolean> {
    await initDB();
    const before = db.data!.companies.length;
    db.data!.companies = db.data!.companies.filter((c) => c.id !== id);
    await db.write();
    return db.data!.companies.length < before;
  }
}

export const companyRepository = new CompanyRepository();
