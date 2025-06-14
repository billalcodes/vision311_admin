import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Get all reports
    const reportsCollection = db.collection('reports');
    
    // Get total count
    const totalRequests = await reportsCollection.countDocuments();
    
    // Get counts by status
    const pendingRequests = await reportsCollection.countDocuments({ status: 'Pending' });
    const inProgressRequests = await reportsCollection.countDocuments({ status: 'In Progress' });
    const resolvedRequests = await reportsCollection.countDocuments({ status: 'Resolved' });
    
    // Get this week's data
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const thisWeekRequests = await reportsCollection.countDocuments({
      createdAt: { $gte: oneWeekAgo }
    });
    
    // Get department/category wise data
    const departmentStats = await reportsCollection.aggregate([
      {
        $group: {
          _id: '$issueType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]).toArray();

    return NextResponse.json({
      totalRequests,
      pendingRequests,
      inProgressRequests,
      resolvedRequests,
      thisWeekRequests,
      departmentStats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}