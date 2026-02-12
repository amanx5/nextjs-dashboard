'use server';

import { z, type typeToFlattenedError } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
	extractRawFormData,
	CreateInvoiceFormSchema,
	UpdateInvoiceFormSchema,
} from '@/app/lib/schemas';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export type ActionStateValue<T extends z.ZodSchema> = {
	errors?: typeToFlattenedError<z.infer<T>>['fieldErrors'];
	message?: string | null;
};

export type CreateInvoiceActionState = ActionStateValue<
	typeof CreateInvoiceFormSchema
>;

export type UpdateInvoiceActionState = ActionStateValue<
	typeof UpdateInvoiceFormSchema
>;

// create
export async function createInvoice(
	prevState: CreateInvoiceActionState,
	formData: FormData,
): Promise<CreateInvoiceActionState> | never {
	const rawFormData = extractRawFormData(CreateInvoiceFormSchema, formData);

	// Validate form using schema.safeParse (doesn' throw)
	const validation = CreateInvoiceFormSchema.safeParse(rawFormData);

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validation.success) {
		return {
			errors: validation.error.flatten().fieldErrors,
			message: 'Validation Error: Invoice not created. Data is invalid.',
		};
	}

	// Prepare data for insertion into the database
	const { customerId, amount, status } = validation.data;
	const amountInCents = amount * 100;
	const date = new Date().toISOString().split('T')[0];

	// Insert data into the database
	try {
		await sql`
			INSERT INTO invoices (customer_id, amount, status, date)
			VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
		`;
	} catch (err) {
		console.error('Database Error:', err);
		throw new Error('Database Error: Failed to Create Invoice.');
	}

	// Revalidate the cache for the invoices page and redirect the user.
	revalidatePath('/dashboard/invoices');
	redirect('/dashboard/invoices');
}

// update
export async function updateInvoice(
	id: string,
	prevState: UpdateInvoiceActionState,
	formData: FormData,
) {
	const rawFormData = extractRawFormData(UpdateInvoiceFormSchema, formData);

	// Validate form using schema.safeParse (doesn't throw)
	const validation = UpdateInvoiceFormSchema.safeParse(rawFormData);

	// If form validation fails, return errors early. Otherwise, continue.
	if (!validation.success) {
		return {
			errors: validation.error.flatten().fieldErrors,
			message: 'Validation Error: Invoice not updated. Data is invalid.',
		};
	}

	const { customerId, amount, status } = validation.data;
	const amountInCents = amount * 100;

	try {
		await sql`
			UPDATE invoices
			SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
			WHERE id = ${id}
		`;
	} catch (err) {
		console.error('Database Error:', err);
		throw new Error('Database Error: Failed to update invoice.');
	}

	revalidatePath('/dashboard/invoices');
	redirect('/dashboard/invoices');
}

// delete
export async function deleteInvoice(id: string) {
	try {
		await sql`DELETE FROM invoices WHERE id = ${id}`;
	} catch (err) {
		console.error('Database Error:', err);
		throw new Error('Database Error: Failed to delete invoice.');
	}

	revalidatePath('/dashboard/invoices');
}
