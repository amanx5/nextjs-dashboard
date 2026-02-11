import { sql } from '@/app/lib/sql';
import type { User } from '@/app/lib/definitions';

export async function getUserByEmail(email: string): Promise<User | undefined> {
	try {
		const user = await sql<
			User[]
		>`SELECT * FROM users WHERE email=${email}`;

		return user[0];
	} catch (error) {
		console.error('Database Error: Failed to fetch user:', error);

		throw new Error('Failed to fetch user.');
	}
}
