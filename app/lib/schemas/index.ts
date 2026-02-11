import { ZodObject, ZodRawShape } from 'zod';

export * from './account-schemas';
export * from './invoice-schemas';

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