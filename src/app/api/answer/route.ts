import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // TODO: your logic here (example structure)
    return NextResponse.json({
      success: true,
      message: "Answer created successfully",
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}