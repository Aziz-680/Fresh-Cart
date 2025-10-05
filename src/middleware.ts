import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const { pathname } = request.nextUrl;

    const authRoutes = ["/login", "/register"];

    const protectedRoutes = ["/", "/allorders", "/payment", "/brands", "/categories", "/cart", "/productDetails"];

    if (token) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    if (!token) {
        if (protectedRoutes.includes(pathname)) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/","/allorders", "/payment", "/brands", "/categories", "/cart", "/productDetails", "/login", "/register"]
};