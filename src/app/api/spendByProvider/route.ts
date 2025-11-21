import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function getSpendByProvider() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const spendByProvider = await db.collection("spendByProvider").find({}).toArray();
    return spendByProvider.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching spend by provider:", error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const spendByProvider = await getSpendByProvider();
    return NextResponse.json(spendByProvider);
  } catch (error) {
    console.error("Error in GET /api/spendByProvider:", error);
    return NextResponse.json({ error: "Failed to fetch spend by provider" }, { status: 500 });
  }
}

