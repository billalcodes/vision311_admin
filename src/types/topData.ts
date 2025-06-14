export interface Report {
  _id: string;
  title: string;
  description: string;
  issueType: string;
  location: string;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Declined';
  urgency: 'low' | 'medium' | 'high';
  createdAt: string;
  authority?: string;
  category: string;
  user: Array<{ name: string; email: string }>;
}

export interface DashboardStats {
  totalRequests: number;
  pendingRequests: number;
  inProgressRequests: number;
  resolvedRequests: number;
  thisWeekRequests: number;
  departmentStats: Array<{ _id: string; count: number }>;
}