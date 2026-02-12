type FieldErrorProps = {
	fieldId: string;
	errors: string[];
};

export function FieldError({ fieldId, errors }: FieldErrorProps) {
	return (
		<div id={fieldId} aria-live='polite' aria-atomic='true'>
			{errors.map((error: string) => (
				<p className='mt-2 text-xs text-red-500' key={error}>
					{error}
				</p>
			))}
		</div>
	);
}
