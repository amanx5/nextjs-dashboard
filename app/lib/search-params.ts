import type { SearchParamsProp } from '@/app/dashboard/invoices/page';

/**
 * Represents the possible types of values that can be returned by URLSearchParams methods.
 * This type is a union of the return types of `getAll` and `get` methods of URLSearchParams.
 */
export type URLSearchParamsValue =
	| ReturnType<typeof URLSearchParams.prototype.getAll>
	| ReturnType<typeof URLSearchParams.prototype.get>;

/**
 * Represents the shape of search parameters passed as props to a page or layout component.
 */
export type SearchParamPropValue = SearchParamsProp[keyof SearchParamsProp];

/**
 * All possible types of search parameter values that can be normalized
 */
export type SearchParamValue = URLSearchParamsValue | SearchParamPropValue;

export function normalizeQueryParam(value: SearchParamValue) {
	const queryStr = Array.isArray(value) ? value.at(-1) : value;

	return queryStr || '';
}

export function normalizePageParam(value: SearchParamValue) {
	const pageStr = Array.isArray(value) ? value.at(-1) : value;

	return Number(pageStr) || 1;
}
