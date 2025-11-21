import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function getCostMetrics() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const costMetrics = await db.collection("costMetrics").find({}).toArray();
    return costMetrics.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching cost metrics:", error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const costMetrics = await getCostMetrics();
    return NextResponse.json(costMetrics);
  } catch (error) {
    console.error("Error in GET /api/costMetrics:", error);
    return NextResponse.json({ error: "Failed to fetch cost metrics" }, { status: 500 });
  }
}

