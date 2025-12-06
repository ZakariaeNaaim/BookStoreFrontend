import { Company } from './company.model';

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  company?: Company;
  companyId?: number;
  role: string;
  isLocked: boolean;
}

export interface RoleManagementVM {
  id: number;
  name: string;
  role: string;
  companyId?: number;
  roles: { text: string; value: string }[];
  companies: Company[];
}
