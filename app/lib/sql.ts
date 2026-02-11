import postgres from 'postgres';

export const sql = postgres(process.env.POSTGRES_URL!, {
	ssl: 'require',
	debug: sqlDebugLoggger,
});

export function sqlDebugLoggger(
	connection: number,
	query: string,
	params: any[],
	paramTypes: any[],
) {
	const timestamp = new Date().toISOString();

	const cleanQuery = query.replace(/\s+/g, ' ').trim(); // temporary way to clean, NOTE: It will trim param values too which is wrong

	let i = 0;
	const interpolatedQuery = cleanQuery.replace(/\$(\d+)/g, () =>
		formatValue(params[i++]),
	);

	const color = {
		date: (s: string) => `\x1b[90m${s}\x1b[0m`,
		query: (s: string) => `\x1b[36m${s}\x1b[0m`,
		yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
	};

	console.log(
		`${color.date(`[${timestamp}]`)}: ${color.query(interpolatedQuery)}`,
	);

	function formatValue(value: unknown): string {
		if (value === null) return 'NULL';
		if (value === undefined) return 'UNDEFINED';
		if (typeof value === 'string') return `'${value.replace(/'/g, "''")}'`;
		if (value instanceof Date) return `'${value.toISOString()}'`;
		if (Array.isArray(value))
			return `ARRAY[${value.map(formatValue).join(', ')}]`;
		if (typeof value === 'object') return `'${JSON.stringify(value)}'`;
		return String(value);
	}
}
