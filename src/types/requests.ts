// src/types/requests.ts

// Base Report/Request type
export interface Report {
    id: string;
    title: string;
    description: string;
    category: string;
    location: string;
    image?: string;
    status: 'Pending' | 'In Progress' | 'Resolved' | 'Declined';
    urgency: 'low' | 'medium' | 'high';
    createdAt: string;
    updatedAt: string;
    userId: User | string;
    authority?: string; // Department handling the request
    updates?: ReportUpdate[];
  }
  
  // User interface
  export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }
  
  // Report update history
  export interface ReportUpdate {
    date: string;
    text: string;
  }
  
  // Dashboard stats
  export interface DashboardStats {
    stats: {
      title: string;
      value: string;
      growthRate: number;
    }[];
  }
  
  // Requests by department/authority
  export interface DepartmentStats {
    departments: string[];
    counts: number[];
    percentages: number[];
  }
  
  // Request timeline data
  export interface TimelineData {
    categories: string[];
    series: {
      name: string;
      data: number[];
    }[];
  }
  
  // Weekly request data
  export interface WeeklyData {
    categories: string[];
    series: {
      name: string;
      data: number[];
    }[];
  }
  
  // Campaign visitors data
  export interface VisitorData {
    categories: string[];
    series: {
      name: string;
      data: number[];
    }[];
    totalVisitors: number;
    growthRate: number;
  }