import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function getRecommendations() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const recommendations = await db.collection("recommendations").find({}).toArray();
    return recommendations.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const recommendations = await getRecommendations();
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Error in GET /api/recommendations:", error);
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
  }
}

