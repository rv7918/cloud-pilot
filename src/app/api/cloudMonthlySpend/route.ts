import { NextResponse } from "next/server";

// Export the data fetching logic so it can be reused
export async function getCloudSpendData() {
  // Hard code data for now - in production, fetch from database
  const monthlyCloudSpendData = [
    { month: "Jan", spend: 1200, capacity: 6000 },
    { month: "Feb", spend: 1800, capacity: 6000 },
    { month: "Mar", spend: 2700, capacity: 6000 },
    { month: "Apr", spend: 500, capacity: 6000 },
    { month: "May", spend: 1500, capacity: 6000 },
    { month: "Jun", spend: 2700, capacity: 6000 },
    { month: "Jul", spend: 2000, capacity: 6000 },
    { month: "Aug", spend: 1600, capacity: 6000 },
    { month: "Sep", spend: 1900, capacity: 6000 },
    { month: "Oct", spend: 500, capacity: 6000 },
    { month: "Nov", spend: 1400, capacity: 6000 },
    { month: "Dec", spend: 1800, capacity: 6000 },
  ]
  return monthlyCloudSpendData;
}

export async function GET(request: Request) {
  const spendData = await getCloudSpendData();
  return NextResponse.json(spendData);
}