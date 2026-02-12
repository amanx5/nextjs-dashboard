
import type { ActionStateValue } from '@/app/lib/actions';
import clsx from 'clsx';

type ActionErrorProps = {
    actionState: ActionStateValue<any>;
};

// TODO: Use proper toast component
export function ActionError({ actionState }: ActionErrorProps) {
	return (
		actionState.message && (
			<p
				className={clsx('mt-4 rounded-md px-4 py-2 text-sm', {
					'bg-red-100 text-red-700': actionState.errors,
					'bg-green-100 text-green-700': !actionState.errors,
				})}
			>
				{actionState.message}
			</p>
		)
	);
}
