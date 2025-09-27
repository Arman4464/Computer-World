import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  // Only run middleware on specific paths to avoid Edge Runtime issues
  const path = request.nextUrl.pathname
  
  // Skip middleware for static files and API routes
  if (
    path.startsWith('/_next') ||
    path.startsWith('/api') ||
    path.includes('.') ||
    path === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value)
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    const { data: { session } } = await supabase.auth.getSession()

    // Protect admin routes
    if (path.startsWith('/admin')) {
      if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
      
      // Check if user is owner (simplified check to avoid database queries in middleware)
      // The actual role check will be done in the admin page component
    }

    // Protect dashboard and booking routes
    if (path.startsWith('/dashboard') || path.startsWith('/book-appointment')) {
      if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }

    // Redirect logged-in users away from login/register pages
    if ((path === '/login' || path === '/register') && session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

  } catch (error) {
    // If there's an error, continue without redirection
    console.error('Middleware error:', error)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
}
