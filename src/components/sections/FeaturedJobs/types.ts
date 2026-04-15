export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyInitial: string;
  location: string;
  type: string;
  applicantCount: number;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  tags: string[];
  postedAt: string;
  isFeatured: boolean;
  isNew: boolean;
}
