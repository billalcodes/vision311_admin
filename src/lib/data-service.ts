// src/lib/data-service.ts
import { connectToDatabase } from './mongodb';

// Dashboard statistics
export async function getDashboardStats() {
  const { db } = await connectToDatabase();
  
  // Get counts for different statuses
  const totalRequests = await db.collection('reports').countDocuments();
  const pendingRequests = await db.collection('reports').countDocuments({ status: 'Pending' });
  const resolvedRequests = await db.collection('reports').countDocuments({ status: 'Resolved' });
  const declinedRequests = await db.collection('reports').countDocuments({ status: 'Declined' });
  
  // Calculate growth rates
  const currentDate = new Date();
  const previousMonth = new Date();
  previousMonth.setMonth(previousMonth.getMonth() - 1);
  
  const currentMonthRequests = await db.collection('reports').countDocuments({
    createdAt: { $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1) }
  });
  
  const previousMonthRequests = await db.collection('reports').countDocuments({
    createdAt: {
      $gte: new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1),
      $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    }
  });
  
  // Calculate growth rate
  const totalGrowthRate = previousMonthRequests === 0 
    ? "100" 
    : ((currentMonthRequests - previousMonthRequests) / previousMonthRequests * 100).toFixed(2);
  
  return {
    stats: [
      {
        title: "Total Requests",
        value: totalRequests.toString(),
        growthRate: parseFloat(totalGrowthRate as string)
      },
      {
        title: "Pending Requests",
        value: pendingRequests.toString(),
        growthRate: 4.35 // Replace with actual calculation
      },
      {
        title: "Fulfilled Requests",
        value: resolvedRequests.toString(),
        growthRate: 2.59 // Replace with actual calculation
      },
      {
        title: "Declined Requests",
        value: declinedRequests.toString(),
        growthRate: -0.95 // Replace with actual calculation
      }
    ]
  };
}

// Add other data access functions similarly...
export async function getRequestsByDepartment() {
  const { db } = await connectToDatabase();
  // Add MongoDB aggregation for departments data
}

export async function getRecentReports(limit = 10) {
  const { db } = await connectToDatabase();
  const reports = await db.collection('reports')
    .find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
  
  return reports;
}