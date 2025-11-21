import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function getCloudSpendData() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const monthlyCloudSpendData = await db.collection("cloudMonthlySpend").find({}).toArray();
    return monthlyCloudSpendData.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching monthly cloud spend data:", error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const spendData = await getCloudSpendData();
    return NextResponse.json(spendData);
  } catch (error) {
    console.error("Error in GET /api/cloudMonthlySpend:", error);
    return NextResponse.json({ error: "Failed to fetch monthly cloud spend data" }, { status: 500 });
  }
}