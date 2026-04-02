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

  // ✅ Company فاقد createdAt است - فقط 'id' را Omit کن
  async createCompany(
    input: Omit<Company, 'id'>
  ): Promise<Company> {
    return companyRepository.create(input);
  }

  async updateCompany(
    id: string,
    input: Partial<Omit<Company, 'id'>>
  ): Promise<Company | null> {
    return companyRepository.update(id, input);
  }

  async deleteCompany(id: string): Promise<boolean> {
    return companyRepository.delete(id);
  }
}

export const companyService = new CompanyService();
