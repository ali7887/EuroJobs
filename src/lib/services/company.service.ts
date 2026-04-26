// src/lib/services/company.service.ts
import { CompanyRepository } from "../repositories/company.repository";
import { Company } from "../db/schema";

export class CompanyService {

  async getCompanies(): Promise<Company[]> {
    return CompanyRepository.findAll();
  }

  async getCompanyById(id: string): Promise<Company | null> {
    return CompanyRepository.getById(id);
  }

  async createCompany(
    input: Omit<Company, "id">
  ): Promise<Company> {
    return CompanyRepository.create(input);
  }

  async updateCompany(
    id: string,
    input: Partial<Omit<Company, "id">>
  ): Promise<Company | null> {
    return CompanyRepository.update(id, input);
  }

  async deleteCompany(id: string): Promise<boolean> {
    return CompanyRepository.delete(id);
  }

}

export const companyService = new CompanyService();
