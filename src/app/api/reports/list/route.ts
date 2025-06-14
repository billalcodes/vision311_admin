import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const status = searchParams.get('status');
    
    const { db } = await connectToDatabase();
    const reportsCollection = db.collection('reports');
    
    // Build query
    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Get reports with user data
    const reports = await reportsCollection.aggregate([
      { $match: query },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $project: {
          title: 1,
          description: 1,
          issueType: 1,
          location: 1,
          status: 1,
          urgency: 1,
          createdAt: 1,
          image: 1,
          'user.name': 1,
          'user.email': 1
        }
      },
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit }
    ]).toArray();
    
    const totalCount = await reportsCollection.countDocuments(query);
    
    return NextResponse.json({
      reports,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}