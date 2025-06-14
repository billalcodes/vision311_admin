import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const reportsCollection = db.collection('reports');
    
    // Urgency Distribution
    const urgencyStats = await reportsCollection.aggregate([
      {
        $group: {
          _id: '$urgency',
          count: { $sum: 1 }
        }
      }
    ]).toArray();
    
    // Recent Activity (last 10 reports)
    const recentActivity = await reportsCollection.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();
    
    // Resolution Metrics (resolved issues only)
    const resolvedIssues = await reportsCollection.find({ 
      status: 'Resolved' 
    }).toArray();
    
    let avgResolutionTime = 0;
    if (resolvedIssues.length > 0) {
      const totalTime = resolvedIssues.reduce((sum, issue) => {
        const created = new Date(issue.createdAt);
        const updated = new Date(issue.updatedAt);
        const diffDays = (updated.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
        return sum + diffDays;
      }, 0);
      avgResolutionTime = totalTime / resolvedIssues.length;
    }
    
    // Department workload
    const departmentWorkload = await reportsCollection.aggregate([
      {
        $match: { status: { $ne: 'Resolved' } }
      },
      {
        $group: {
          _id: '$authority',
          pendingCount: { $sum: 1 }
        }
      },
      { $sort: { pendingCount: -1 } }
    ]).toArray();

    return NextResponse.json({
      urgencyStats,
      recentActivity,
      avgResolutionTime: Math.round(avgResolutionTime * 10) / 10,
      resolvedCount: resolvedIssues.length,
      departmentWorkload
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}