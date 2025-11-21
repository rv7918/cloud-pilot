import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function getCloudData() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const cloudSpendData = await db.collection("cloudSpend").find({}).toArray();
    return cloudSpendData.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching cloud spend data:", error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const cloudData = await getCloudData();
    return NextResponse.json(cloudData);
  } catch (error) {
    console.error("Error in GET /api/cloudSpend:", error);
    return NextResponse.json({ error: "Failed to fetch cloud spend data" }, { status: 500 });
  }
}