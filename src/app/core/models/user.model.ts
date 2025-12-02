import { Company } from './company.model';

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  company?: Company;
  companyId?: number;
  role: string;
}

export interface RoleManagementVM {
  user: User;
  roles: string[];
  companies: Company[];
}
