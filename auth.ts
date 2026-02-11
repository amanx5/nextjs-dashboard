import { authConfig } from '@/auth.config';
import type { User } from '@/app/lib/definitions';
import { UserCredentialSchema } from '@/app/lib/schemas';
import { getUserByEmail } from '@/app/lib/data';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const authResult = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				let user: User | null = null;

				const parsedCredentials =
					UserCredentialSchema.safeParse(credentials);

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;
					const userData = await getUserByEmail(email);

					if (userData) {
						const passwordsMatch = await bcrypt.compare(
							password,
							userData.password,
						);

						if (passwordsMatch) {
							user = userData;
						}
					}
				}

				return user;
			},
		}),
	],
});

export const { signIn, signOut, auth } = authResult;
