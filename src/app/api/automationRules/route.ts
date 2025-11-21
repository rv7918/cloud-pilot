import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function getAutomationRules() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const rules = await db.collection("automationRules").find({}).toArray();
    return rules.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching automation rules:", error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const rules = await getAutomationRules();
    return NextResponse.json(rules);
  } catch (error) {
    console.error("Error in GET /api/automationRules:", error);
    return NextResponse.json({ error: "Failed to fetch automation rules" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await request.json();
    
    const newRule = {
      id: Date.now().toString(),
      ruleName: body.ruleName,
      trigger: body.trigger,
      action: body.action,
      cloud: body.cloud,
      status: body.status || "Active",
    };

    const result = await db.collection("automationRules").insertOne(newRule);
    const insertedRule = {
      ...newRule,
      _id: result.insertedId.toString(),
    };
    return NextResponse.json(insertedRule, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/automationRules:", error);
    return NextResponse.json({ error: "Failed to create automation rule" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Rule ID is required" }, { status: 400 });
    }

    const result = await db.collection("automationRules").deleteOne({ id });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Rule not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/automationRules:", error);
    return NextResponse.json({ error: "Failed to delete automation rule" }, { status: 500 });
  }
}

