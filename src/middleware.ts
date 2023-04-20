import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /examples (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)',
  ],
}

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl

  if (url.pathname !== '/login' && !req.cookies.get('token')) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (url.pathname === '/login' && req.cookies.get('token')) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.rewrite(req.url)
}
