import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const reportsCollection = db.collection('reports');
    
    // Get start of current week (Monday)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Create array for each day of the week
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const totalComplaints = new Array(7).fill(0);
    const fulfilledComplaints = new Array(7).fill(0);
    
    // Get total complaints for each day of this week
    for (let i = 0; i < 7; i++) {
      const dayStart = new Date(startOfWeek);
      dayStart.setDate(startOfWeek.getDate() + i);
      
      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);
      
      // Total complaints for this day
      const totalCount = await reportsCollection.countDocuments({
        createdAt: { $gte: dayStart, $lte: dayEnd }
      });
      
      // Fulfilled complaints for this day
      const fulfilledCount = await reportsCollection.countDocuments({
        createdAt: { $gte: dayStart, $lte: dayEnd },
        status: 'Resolved'
      });
      
      totalComplaints[i] = totalCount;
      fulfilledComplaints[i] = fulfilledCount;
    }
    
    return NextResponse.json({
      series: [
        { name: "Total complaints", data: totalComplaints },
        { name: "Fulfilled", data: fulfilledComplaints }
      ],
      categories: daysOfWeek
    });
  } catch (error) {
    console.error('Error fetching weekly data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weekly data' },
      { status: 500 }
    );
  }
}