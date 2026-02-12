/**
 * Type of search parameter values returned by `get`/`getAll` method of URLSearchParams.
 */
export type URLSearchParamValue =
	| ReturnType<typeof URLSearchParams.prototype.getAll>
	| ReturnType<typeof URLSearchParams.prototype.get>;

/**
 * Type of search parameter values resolved on awaiting `PageProps['searchParams]`.
 */
export type PageSearchParamValue = Awaited<
	PageProps<'/'>['searchParams']
>[string];

/**
 * Universal type of search parameter values from different sources.
 */
export type SearchParamValue = URLSearchParamValue | PageSearchParamValue;

/**
 * Normalizes `\dashboard\invoices?query`.
 */
export function normalizeQuerySearchParam(value: SearchParamValue) {
	const queryStr = Array.isArray(value) ? value.at(-1) : value;

	return queryStr || '';
}

/**
 * Normalizes `\dashboard\invoices?page`.
 */
export function normalizePageSearchParam(value: SearchParamValue) {
	const pageStr = Array.isArray(value) ? value.at(-1) : value;

	return Number(pageStr) || 1;
}
