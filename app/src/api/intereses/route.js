import { NextResponse } from "next/server";
import intereses from "@/lib/mock_data/intereses.json";

export async function GET(request) {
  return NextResponse.json(intereses);
}
