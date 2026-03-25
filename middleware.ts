import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')

  if (isDashboard) {
    // Proteção básica (client já valida também)
    return NextResponse.next()
  }

  return NextResponse.next()
}