import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || 'monthly';
    
    const { db } = await connectToDatabase();
    const reportsCollection = db.collection('reports');
    
    let groupBy: any;
    let categories: string[];
    
    if (timeframe === 'yearly') {
      groupBy = {
        year: { $year: "$createdAt" }
      };
      categories = ["2019", "2020", "2021", "2022", "2023", "2024"];
    } else {
      groupBy = {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" }
      };
      categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    }
    
    // Get received requests by time period
    const receivedData = await reportsCollection.aggregate([
      {
        $group: {
          _id: groupBy,
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]).toArray();
    
    // Get closed/resolved requests by time period
    const closedData = await reportsCollection.aggregate([
      {
        $match: { status: "Resolved" }
      },
      {
        $group: {
          _id: groupBy,
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]).toArray();
    
    // Process data for chart
    const receivedSeries = new Array(categories.length).fill(0);
    const closedSeries = new Array(categories.length).fill(0);
    
    receivedData.forEach(item => {
      const index = timeframe === 'yearly' 
        ? categories.indexOf(item._id.year.toString())
        : item._id.month - 1;
      if (index >= 0) receivedSeries[index] = item.count;
    });
    
    closedData.forEach(item => {
      const index = timeframe === 'yearly'
        ? categories.indexOf(item._id.year.toString())
        : item._id.month - 1;
      if (index >= 0) closedSeries[index] = item.count;
    });
    
    return NextResponse.json({
      series: [
        { name: "Received Requests", data: receivedSeries },
        { name: "Closed Requests", data: closedSeries }
      ],
      categories
    });
  } catch (error) {
    console.error('Error fetching timeline data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch timeline data' },
      { status: 500 }
    );
  }
}