import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const authResult = NextAuth(authConfig);

export default authResult.auth;

// route protection for all routes except static assets and API routes.
export const config = {
	// https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
