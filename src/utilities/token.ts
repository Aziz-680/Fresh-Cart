"use server"

import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

/**
 * Retrieves and decodes the NextAuth session token from cookies.
 * Handles both secure (HTTPS) and non-secure (HTTP) cookie names.
 */
export async function getMyToken() {
    const cookieStore = await cookies();
    
    // 1. NextAuth uses __Secure- prefix on production/HTTPS
    const secureToken = cookieStore.get("__Secure-next-auth.session-token")?.value;
    const commonToken = cookieStore.get("next-auth.session-token")?.value;
    
    const sessionToken = secureToken || commonToken;

    if (!sessionToken) {
        return null;
    }

    try {
        const decoded = await decode({
            token: sessionToken,
            secret: process.env.NEXTAUTH_SECRET!
        });

        // Ensure we are returning the correct token string from the payload
        return decoded?.token as string || null;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}