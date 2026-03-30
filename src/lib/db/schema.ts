export type Company = {
  id: string;
  name: string;
  logo: string;
  website?: string;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  location: string;
  salary?: string;
  type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'REMOTE';
  companyId: string;
  categoryId?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Database = {
  jobs: Job[];
  companies: Company[];
  categories: Category[];
};
