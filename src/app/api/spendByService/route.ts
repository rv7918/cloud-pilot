import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function getSpendByService() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const spendByService = await db.collection("spendByService").find({}).toArray();
    return spendByService.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching spend by service:", error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const spendByService = await getSpendByService();
    return NextResponse.json(spendByService);
  } catch (error) {
    console.error("Error in GET /api/spendByService:", error);
    return NextResponse.json({ error: "Failed to fetch spend by service" }, { status: 500 });
  }
}

