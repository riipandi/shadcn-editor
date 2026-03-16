// middleware.ts
import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ua = request.headers.get("user-agent") ?? ""

  // Redirect known AI crawlers to the LLM-friendly .md route
  const isAIBot =
    /GPTBot|Claude-Web|anthropic-ai|Bytespider|SemrushBot/i.test(ua)

  if (isAIBot && !pathname.endsWith(".md") && pathname.startsWith("/docs")) {
    const url = request.nextUrl.clone()
    url.pathname = pathname + ".md"
    return NextResponse.redirect(url, { status: 302 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/docs/:path*"],
}
