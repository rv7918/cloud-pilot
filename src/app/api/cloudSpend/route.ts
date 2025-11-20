import { NextResponse } from "next/server";

// Export the data fetching logic so it can be reused
export async function getCloudData() {
  // Hard code data for now - in production, fetch from database
  const cloudSpendData = [
    { name: "AWS", spend: 5420, trend: 99.8, color: "hsl(221.2 83.2% 53.3%)", bgColor: "#EFF6FF" },
    { name: "Azure", spend: 1340, trend: 54.8, color: "hsl(280 100% 70%)", bgColor: "#EEF2FF" },
    { name: "GCP", spend: 2940, trend: 64.8, color: "hsl(280 50% 50%)", bgColor: "#FAF5FF" },
    { name: "CPL", spend: 1025, trend: 99.8, color: "hsl(142.1 76.2% 36.3%)", bgColor: "#ECFDF5" },
  ]
  return cloudSpendData;
}

export async function GET(request: Request) {
  const cloudData = await getCloudData();
  return NextResponse.json(cloudData);
}