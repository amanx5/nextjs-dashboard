'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export async function signInUser(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		await signIn('credentials', formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Invalid credentials.';
				default:
					return 'Something went wrong.';
			}
		}

		throw error;
	}
}

export async function signOutUser() {
	await signOut({ redirectTo: '/' });
}
