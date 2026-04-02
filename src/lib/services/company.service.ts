// src/lib/services/company.service.ts
import { companyRepository } from '../repositories/company.repository';
import { Company } from '../db/schema';

export class CompanyService {
  async getCompanies(): Promise<Company[]> {
    return companyRepository.findAll();
  }

  async getCompanyById(id: string): Promise<Company | undefined> {
    return companyRepository.findById(id);
  }

  async createCompany(
    input: Omit<Company, 'id' | 'createdAt'>   // ✅ فقط 'id' حذف نیست
  ): Promise<Company> {
    return companyRepository.create({
      ...input,
      createdAt: new Date().toISOString(),      // ✅ اینجا تولید می‌شود
    });
  }

  async updateCompany(
    id: string,
    input: Partial<Omit<Company, 'id' | 'createdAt'>>
  ): Promise<Company | null> {
    return companyRepository.update(id, input);
  }

  async deleteCompany(id: string): Promise<boolean> {
    return companyRepository.delete(id);
  }
}

export const companyService = new CompanyService();
