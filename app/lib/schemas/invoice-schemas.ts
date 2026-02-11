import { z } from 'zod';

const InvoiceFormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

export const CreateInvoiceFormSchema = InvoiceFormSchema.omit({
    id: true,
    date: true,
});

export const UpdateInvoiceFormSchema = InvoiceFormSchema.omit({
    id: true,
    date: true,
});

