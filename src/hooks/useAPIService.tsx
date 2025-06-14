import { useState, useEffect } from 'react';

interface Stats {
  totalRequests: number;
  pendingRequests: number;
  inProgressRequests: number;
  resolvedRequests: number;
  thisWeekRequests: number;
  departmentStats: Array<{ _id: string; count: number }>;
}

interface Report {
  _id: string;
  title: string;
  description: string;
  issueType: string;
  location: string;
  status: string;
  urgency: string;
  createdAt: string;
  authority?: string;
  user: Array<{ name: string; email: string }>;
}

export const useDashboardStats = () => {
  const [data, setData] = useState<{ stats: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/reports/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const stats = await response.json();
        
        // Transform the data to match your component's expected format
        const transformedStats = [
          { 
            title: "Total Requests", 
            value: stats.totalRequests.toString(), 
            growthRate: 0 
          },
          { 
            title: "Pending Requests", 
            value: stats.pendingRequests.toString(), 
            growthRate: 0 
          },
          { 
            title: "Fulfilled Requests", 
            value: stats.resolvedRequests.toString(), 
            growthRate: 0 
          },
          { 
            title: "In Progress", 
            value: stats.inProgressRequests.toString(), 
            growthRate: 0 
          }
        ];

        setData({ stats: transformedStats });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { data, loading, error };
};
export const useTimelineData = (timeframe: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await fetch(`/api/reports/timeline?timeframe=${timeframe}`);
        if (!response.ok) {
          // If endpoint doesn't exist yet, use mock data
          const mockData = {
            series: [
              {
                name: "Received Requests",
                data: timeframe === 'monthly' 
                  ? [23, 31, 28, 35, 42, 38, 45, 51, 47, 39, 44, 52]
                  : [340, 425, 398, 467, 521, 489]
              },
              {
                name: "Closed Requests", 
                data: timeframe === 'monthly'
                  ? [20, 28, 25, 32, 38, 35, 41, 47, 43, 36, 40, 48]
                  : [298, 387, 352, 421, 478, 441]
              }
            ],
            categories: timeframe === 'monthly'
              ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
              : ["2019", "2020", "2021", "2022", "2023", "2024"]
          };
          setData(mockData);
          return;
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        // Fallback to mock data on error
        const mockData = {
          series: [
            {
              name: "Received Requests",
              data: timeframe === 'monthly' 
                ? [23, 31, 28, 35, 42, 38, 45, 51, 47, 39, 44, 52]
                : [340, 425, 398, 467, 521, 489]
            },
            {
              name: "Closed Requests", 
              data: timeframe === 'monthly'
                ? [20, 28, 25, 32, 38, 35, 41, 47, 43, 36, 40, 48]
                : [298, 387, 352, 421, 478, 441]
            }
          ],
          categories: timeframe === 'monthly'
            ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            : ["2019", "2020", "2021", "2022", "2023", "2024"]
        };
        setData(mockData);
        setError(null); // Don't show error, just use mock data
      } finally {
        setLoading(false);
      }
    };

    fetchTimelineData();
  }, [timeframe]);

  return { data, loading, error };
};
export const useWeeklyRequests = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await fetch('/api/reports/weekly');
        if (!response.ok) {
          // If endpoint doesn't exist yet, use mock data
          const mockData = {
            series: [
              {
                name: "Total complaints",
                data: [12, 18, 15, 22, 25, 28, 20], // Mon, Tue, Wed, Thu, Fri, Sat, Sun
              },
              {
                name: "Fulfilled",
                data: [8, 12, 10, 16, 18, 21, 15], // Resolved complaints per day
              },
            ],
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          };
          setData(mockData);
          return;
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        // Fallback to mock data on error
        const mockData = {
          series: [
            {
              name: "Total complaints",
              data: [12, 18, 15, 22, 25, 28, 20],
            },
            {
              name: "Fulfilled", 
              data: [8, 12, 10, 16, 18, 21, 15],
            },
          ],
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        };
        setData(mockData);
        setError(null); // Don't show error, just use mock data
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, []);

  return { data, loading, error };
};
export const useDepartmentStats = (timeframe: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartmentStats = async () => {
      try {
        const response = await fetch(`/api/reports/departments?timeframe=${timeframe}`);
        if (!response.ok) {
          // If endpoint doesn't exist yet, use mock data
          const mockData = {
            departments: ["Road Issues", "Streetlights", "Parks & Recreation", "Waste Management", "Utilities"],
            counts: [45, 32, 28, 22, 18],
            percentages: [31, 22, 19, 15, 13]
          };
          setData(mockData);
          return;
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        // Fallback to mock data on error
        const mockData = {
          departments: ["Road Issues", "Streetlights", "Parks & Recreation", "Waste Management", "Utilities"],
          counts: [45, 32, 28, 22, 18],
          percentages: [31, 22, 19, 15, 13]
        };
        setData(mockData);
        setError(null); // Don't show error, just use mock data
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentStats();
  }, [timeframe]);

  return { data, loading, error };
};

export const useRecentReports = () => {
  const [data, setData] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/reports/list?limit=10');
        if (!response.ok) throw new Error('Failed to fetch reports');
        const result = await response.json();
        
        // Transform the data to match your component's expected format
        const transformedReports = result.reports.map((report: any) => ({
          _id: report._id,
          title: report.title,
          description: report.description,
          issueType: report.issueType,
          location: report.location,
          status: report.status,
          urgency: report.urgency,
          createdAt: report.createdAt,
          authority: report.authority || 'City Maintenance',
          category: report.issueType, // Using issueType as category
          user: report.user
        }));

        setData(transformedReports);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return { data, loading, error };
};
export const useInsights = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        // For now, just use mock data
        const mockData = {
          issueTypes: [
            { _id: 'Pothole', count: 5 },
            { _id: 'Streetlight', count: 3 },
            { _id: 'Graffiti', count: 2 },
            { _id: 'Illegal Dumping', count: 2 }
          ],
          urgencyLevels: [
            { _id: 'medium', count: 8 },
            { _id: 'high', count: 3 },
            { _id: 'low', count: 1 }
          ],
          locationHotspots: [
            { _id: 'Main Street', count: 3, avgConfidence: 0.85 },
            { _id: 'Oak Avenue', count: 2, avgConfidence: 0.75 }
          ],
          aiStats: {
            avgConfidence: 0.78,
            highConfidence: 8,
            lowConfidence: 2,
            total: 12
          }
        };
        setData(mockData);
      } catch (err) {
        setError('Failed to load insights');
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return { data, loading, error };
};
export const useDashboardData = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/reports/dashboard');
        if (!response.ok) {
          // Mock data if API fails
          const mockData = {
            urgencyStats: [
              { _id: 'medium', count: 8 },
              { _id: 'high', count: 3 },
              { _id: 'low', count: 1 }
            ],
            recentActivity: [
              { _id: '1', title: 'Pothole Report', location: 'Main St', createdAt: new Date().toISOString(), status: 'Pending' },
              { _id: '2', title: 'Streetlight Issue', location: 'Oak Ave', createdAt: new Date().toISOString(), status: 'In Progress' }
            ],
            avgResolutionTime: 2.3,
            resolvedCount: 6,
            departmentWorkload: [
              { _id: 'City Maintenance', pendingCount: 5 },
              { _id: 'Public Works', pendingCount: 3 }
            ]
          };
          setData(mockData);
          return;
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        // Use mock data on error
        const mockData = {
          urgencyStats: [
            { _id: 'medium', count: 8 },
            { _id: 'high', count: 3 },
            { _id: 'low', count: 1 }
          ],
          recentActivity: [
            { _id: '1', title: 'Pothole Report', location: 'Main St', createdAt: new Date().toISOString(), status: 'Pending' },
            { _id: '2', title: 'Streetlight Issue', location: 'Oak Ave', createdAt: new Date().toISOString(), status: 'In Progress' }
          ],
          avgResolutionTime: 2.3,
          resolvedCount: 6,
          departmentWorkload: [
            { _id: 'City Maintenance', pendingCount: 5 },
            { _id: 'Public Works', pendingCount: 3 }
          ]
        };
        setData(mockData);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { data, loading, error };
};