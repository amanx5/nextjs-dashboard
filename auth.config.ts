import type { NextAuthConfig } from 'next-auth';

// Centralized authentication configuration for NextAuth.js
// This config exports the common properties needed in both auth.ts and proxy.ts

export const authConfig = {
	pages: {
		signIn: '/login',
	},
	callbacks: {
		authorized({ request, auth }) {
			const { nextUrl } = request;
			const isRequestForDashboard = nextUrl.pathname.startsWith('/dashboard');
			const isLoggedIn = !!auth?.user;

			if (isRequestForDashboard) {
				if (isLoggedIn) {
					return true;
				} else {
					return false; // Redirect unauthenticated users to login page
				}
			} else {
				if (isLoggedIn) {
					return Response.redirect(new URL('/dashboard', nextUrl));
				} else {
					return true;
				}
			}
		},
	},

	// providers (Authentication methods) defines how users log in.
	// this is kept as [] since proxy.ts doesn't need this as providers has nothing to do with route protection.
	// The actual providers are defined in auth.ts where the authentication logic is implemented.
	providers: [],
} satisfies NextAuthConfig;
