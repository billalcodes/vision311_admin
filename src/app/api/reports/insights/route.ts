import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const reportsCollection = db.collection('reports');
    
    // Issue Type Distribution
    const issueTypes = await reportsCollection.aggregate([
      {
        $group: {
          _id: '$issueType',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]).toArray();
    
    // Urgency Distribution
    const urgencyLevels = await reportsCollection.aggregate([
      {
        $group: {
          _id: '$urgency',
          count: { $sum: 1 }
        }
      }
    ]).toArray();
    
    // Location Hotspots
    const locationHotspots = await reportsCollection.aggregate([
      {
        $group: {
          _id: '$location',
          count: { $sum: 1 },
          avgConfidence: { $avg: '$confidenceScore' },
          latestIssue: { $max: '$createdAt' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]).toArray();
    
    // Response Time Analytics (resolved issues)
    const responseTimeData = await reportsCollection.aggregate([
      {
        $match: { status: 'Resolved' }
      },
      {
        $addFields: {
          responseTime: {
            $divide: [
              { $subtract: ['$updatedAt', '$createdAt'] },
              86400000 // Convert to days
            ]
          }
        }
      },
      {
        $group: {
          _id: '$issueType',
          avgResponseTime: { $avg: '$responseTime' },
          count: { $sum: 1 }
        }
      }
    ]).toArray();
    
    // AI Confidence Stats
    const aiStats = await reportsCollection.aggregate([
      {
        $group: {
          _id: null,
          avgConfidence: { $avg: '$confidenceScore' },
          highConfidence: {
            $sum: {
              $cond: [{ $gte: ['$confidenceScore', 0.8] }, 1, 0]
            }
          },
          lowConfidence: {
            $sum: {
              $cond: [{ $lt: ['$confidenceScore', 0.5] }, 1, 0]
            }
          },
          total: { $sum: 1 }
        }
      }
    ]).toArray();
    
    // User Activity
    const userActivity = await reportsCollection.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $group: {
          _id: '$userId',
          userName: { $first: { $arrayElemAt: ['$user.name', 0] } },
          reportCount: { $sum: 1 },
          latestReport: { $max: '$createdAt' }
        }
      },
      { $sort: { reportCount: -1 } },
      { $limit: 5 }
    ]).toArray();
    
    return NextResponse.json({
      issueTypes,
      urgencyLevels,
      locationHotspots,
      responseTimeData,
      aiStats: aiStats[0] || { avgConfidence: 0, highConfidence: 0, lowConfidence: 0, total: 0 },
      userActivity
    });
  } catch (error) {
    console.error('Error fetching insights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insights' },
      { status: 500 }
    );
  }
}