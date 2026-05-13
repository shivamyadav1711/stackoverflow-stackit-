import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Example vote payload
    const { userId, questionId, voteType } = body;

    // TODO: add Appwrite logic here

    return NextResponse.json({
      success: true,
      message: "Vote recorded",
      data: { userId, questionId, voteType },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Vote failed" },
      { status: 500 }
    );
  }
}