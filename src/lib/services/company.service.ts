import { companyRepository } from "@/lib/repositories/company.repository";
import { Company } from "@/lib/db/schema";

export class CompanyService {
  async getCompanies(): Promise<Company[]> {
    return companyRepository.findAll();
  }

  async getCompanyById(id: string): Promise<Company | null> {
    return (await companyRepository.findById(id)) ?? null;
  }

  async createCompany(input: Omit<Company, "id" | "createdAt">): Promise<Company> {
    return companyRepository.create(input);
  }

  async updateCompany(id: string, input: Partial<Omit<Company, "id" | "createdAt">>): Promise<Company | null> {
    return companyRepository.update(id, input);
  }

  async deleteCompany(id: string): Promise<boolean> {
    return companyRepository.delete(id);
  }
}

export const companyService = new CompanyService();
