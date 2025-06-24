import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const hasToken = request.cookies.get('accessToken')?.value;
  console.log('middleware called', hasToken);
  if (hasToken === undefined || hasToken === null) {
    request.nextUrl.pathname = '/auth/login';

    return NextResponse.redirect(request.nextUrl);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/authenticated/:path*'],
};
