import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || 'monthly';
    
    const { db } = await connectToDatabase();
    const reportsCollection = db.collection('reports');
    
    // Build date filter based on timeframe
    let dateFilter = {};
    if (timeframe === 'monthly') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      dateFilter = { createdAt: { $gte: oneMonthAgo } };
    } else if (timeframe === 'yearly') {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      dateFilter = { createdAt: { $gte: oneYearAgo } };
    }
    
    // Get department stats
    const departmentStats = await reportsCollection.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: '$issueType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 } // Top 5 departments
    ]).toArray();
    
    // Calculate total for percentages
    const total = departmentStats.reduce((sum, dept) => sum + dept.count, 0);
    
    // Process data
    const departments = departmentStats.map(dept => dept._id || 'Unknown');
    const counts = departmentStats.map(dept => dept.count);
    const percentages = departmentStats.map(dept => 
      total > 0 ? Math.round((dept.count / total) * 100) : 0
    );
    
    return NextResponse.json({
      departments,
      counts,
      percentages
    });
  } catch (error) {
    console.error('Error fetching department stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch department stats' },
      { status: 500 }
    );
  }
}