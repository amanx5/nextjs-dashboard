'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import Link from 'next/link';
import {
	CheckIcon,
	ClockIcon,
	CurrencyDollarIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import {
	updateInvoice,
	type UpdateInvoiceActionState,
} from '@/app/lib/actions';
import { FieldError } from '@/app/ui/invoices/field-error';
import { useActionState } from 'react';
import { ActionError } from '@/app/ui/invoices/action-error';

type Props = {
	invoice: InvoiceForm;
	customers: CustomerField[];
};

export default function Form({ invoice, customers }: Props) {
	const initialActionState: UpdateInvoiceActionState = {
		message: null,
		errors: {},
	};
	const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
	const [actionState, action] = useActionState(
		updateInvoiceWithId,
		initialActionState,
	);

	const {
		customerId: customerIdErrors = [],
		amount: amountErrors = [],
		status: statusErrors = [],
	} = actionState.errors ?? {};

	return (
		<form action={action}>
			{/* form fields */}
			<div className='rounded-md bg-gray-50 p-4 md:p-6'>
				{/* Customer Name */}
				<div className='mb-4'>
					{/* field label */}
					<label
						htmlFor='customer'
						className='mb-2 block text-sm font-medium'
					>
						Choose customer
					</label>

					{/* select wrapper */}
					<div className='relative'>
						<select
							id='customer'
							name='customerId'
							className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
							defaultValue={invoice.customer_id}
							aria-describedby='customer-error'
						>
							<option value='' disabled>
								Select a customer
							</option>
							{customers.map((customer) => (
								<option key={customer.id} value={customer.id}>
									{customer.name}
								</option>
							))}
						</select>

						<UserCircleIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
					</div>

					{/* field error */}
					<FieldError
						fieldId='customer-error'
						errors={customerIdErrors}
					/>
				</div>

				{/* Invoice Amount */}
				<div className='mb-4'>
					{/* field label */}
					<label
						htmlFor='amount'
						className='mb-2 block text-sm font-medium'
					>
						Choose an amount
					</label>

					{/* input wrapper */}
					<div className='relative mt-2 rounded-md'>
						<div className='relative'>
							<input
								id='amount'
								name='amount'
								type='number'
								step='0.01'
								defaultValue={invoice.amount}
								placeholder='Enter USD amount'
								className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
								aria-describedby='amount-error'
							/>

							<CurrencyDollarIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
						</div>
					</div>

					{/* field error */}
					<FieldError fieldId='amount-error' errors={amountErrors} />
				</div>

				{/* Invoice Status */}
				<fieldset>
					{/* fieldset label */}
					<legend className='mb-2 block text-sm font-medium'>
						Set the invoice status
					</legend>

					{/* fieldset fields wrapper */}
					<div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
						<div className='flex gap-4'>
							<div className='flex items-center'>
								{/* pending radio field */}
								<input
									id='pending'
									name='status'
									type='radio'
									value='pending'
									defaultChecked={invoice.status == 'pending'}
									className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
								/>

								<label
									htmlFor='pending'
									className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600'
								>
									Pending <ClockIcon className='h-4 w-4' />
								</label>
							</div>

							<div className='flex items-center'>
								{/* paid radio field */}
								<input
									id='paid'
									name='status'
									type='radio'
									value='paid'
									defaultChecked={invoice.status == 'paid'}
									className='h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2'
								/>

								<label
									htmlFor='paid'
									className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white'
								>
									Paid <CheckIcon className='h-4 w-4' />
								</label>
							</div>
						</div>
					</div>

					{/* fieldset error */}
					<FieldError fieldId='status-error' errors={statusErrors} />
				</fieldset>
			</div>
			{/* form submission error */}
			<ActionError actionState={actionState} />

			{/* form controls */}
			<div className='mt-6 flex justify-end gap-4'>
				{/* Cancel */}
				<Link
					href='/dashboard/invoices'
					className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
				>
					Cancel
				</Link>

				{/* Edit */}
				<Button type='submit'>Edit Invoice</Button>
			</div>
		</form>
	);
}
