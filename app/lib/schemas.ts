import { z, ZodObject, ZodRawShape } from 'zod';

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

type StringKeysOf<T> = Extract<keyof T, string>;
type ShapeKeys<Shape extends ZodRawShape> = StringKeysOf<Shape>;
export type ExtractedFormData<Shape extends ZodRawShape> = {
    [K in ShapeKeys<Shape>]: FormDataEntryValue | null;
};

export function extractRawFormData<Shape extends ZodRawShape>(
    formSchema: ZodObject<Shape>,
    formData: FormData,
): ExtractedFormData<Shape> {
    const schemaKeys = Object.keys(formSchema.shape) as ShapeKeys<Shape>[];
    const extracted = {} as ExtractedFormData<Shape>;

    for (const key of schemaKeys) {
        const value = formData.get(key);
        extracted[key] = value;
    }

    return extracted;
}