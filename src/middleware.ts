import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function appMiddleware(request: NextRequest) {
  return NextResponse.next();
}
