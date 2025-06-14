// src/config/api.ts

// API base URL - set in your .env.local file
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: '/auth/user',
  
  // Reports
  REPORTS: '/reports',
  REPORT_STATS: '/reports/stats',
  REPORTS_BY_DEPARTMENT: '/reports/by-department',
  REPORTS_TIMELINE: '/reports/timeline',
  REPORTS_WEEKLY: '/reports/weekly',
  REPORTS_VISITORS: '/reports/visitors',
  REPORTS_RECENT: '/reports/recent',
  
  // Update report status
  UPDATE_REPORT: (id: string) => `/reports/${id}`
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'cityfix_token',
  USER: 'cityfix_user'
};

// Default request headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};