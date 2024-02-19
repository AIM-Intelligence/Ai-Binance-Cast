import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from './routes';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  //! Page Protection
  const { data } = await supabase.auth.getUser();

  const url = new URL(request.url);

  const isPublicRoutes = publicRoutes.includes(url.pathname);
  const isAuthRoute = authRoutes.includes(url.pathname);

  if (url.pathname === '/auth') {
    return NextResponse.redirect(new URL('/auth/sign-up', request.url));
  }

  if (isAuthRoute) {
    if (data.user) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.url)
      );
    }
    return response;
  }

  if (!isPublicRoutes) {
    if (!data.user) {
      return NextResponse.redirect(
        new URL('/auth/sign-up?next=' + url.pathname, request.url)
      );
    }
    return response;
  }

  return response;
}

// Optionally, don't invoke Middleware on some paths
// Image crack problem exists => solve
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
// export const config = {
//   matcher: [

//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// };
