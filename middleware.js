export async function middleware(request) {
  fetch(new URL("/api/traffic", request.url), {
    method: "POST",
  });

  return;
}

export const config = {
  matcher: "/:path*",
};
