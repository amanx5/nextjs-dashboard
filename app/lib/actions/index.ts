import { z, type typeToFlattenedError } from 'zod';

export * from './account-actions'
export * from './invoice-actions'


export type ActionStateValue<T extends z.ZodSchema> = {
	errors?: typeToFlattenedError<z.infer<T>>['fieldErrors'];
	message?: string | null;
};