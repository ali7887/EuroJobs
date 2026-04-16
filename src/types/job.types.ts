export interface JobCreateInput {
  title: string;
  description: string;
  location: string;
  salary?: number;
  skills: string[];
  jobType: string;
  type: string;

}
